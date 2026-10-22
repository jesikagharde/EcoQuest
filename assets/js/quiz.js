/**
 * ECOQUEST QUIZ ENGINE & ECOIQ PLATFORM (assets/js/quiz.js)
 * Implements randomized question selection, category quizzes, full assessments,
 * streak mechanics, answer review modals, retake vs new assessment workflows,
 * and comprehensive assessment history tracking.
 */
(function() {
    let currentQuizSession = null;
    let quizCurrentIndex = 0;
    let quizUserAnswers = [];
    let currentStreak = 0;
    let highestSessionStreak = 0;
    let activeQuizType = 'quick';
    let activeQuizCategory = null;

    /**
     * Fisher-Yates array shuffler
     */
    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    /**
     * Build questions for a new assessment session
     */
    function generateQuestionSet(type, category = null, explicitIds = null) {
        const allQuestions = window.EcoData.ecoIQQuestions || [];
        if (allQuestions.length === 0) return [];

        // If explicit IDs provided (for RETAKE)
        if (Array.isArray(explicitIds) && explicitIds.length > 0) {
            const ordered = [];
            explicitIds.forEach(id => {
                const q = allQuestions.find(item => item.id === id);
                if (q) ordered.push(q);
            });
            if (ordered.length > 0) return ordered;
        }

        // Category Quiz: Filter by specific category
        if (type === 'category' && category) {
            const catQuestions = allQuestions.filter(q => q.category.toLowerCase() === category.toLowerCase());
            const shuffled = shuffleArray(catQuestions);
            return shuffled.slice(0, Math.min(10, shuffled.length));
        }

        // Mixed Quizzes: Quick (10 questions) or Full (20 questions)
        const targetCount = (type === 'full') ? 20 : 10;
        
        // Group questions by category to ensure balanced distribution
        const byCategory = {};
        allQuestions.forEach(q => {
            if (!byCategory[q.category]) byCategory[q.category] = [];
            byCategory[q.category].push(q);
        });

        const selected = [];
        const categories = shuffleArray(Object.keys(byCategory));

        // First pass: pick 1 question from each available category
        categories.forEach(cat => {
            if (selected.length < targetCount && byCategory[cat].length > 0) {
                const shuffledCat = shuffleArray(byCategory[cat]);
                selected.push(shuffledCat[0]);
            }
        });

        // Second pass: if we need more questions (for 20-question full quiz), pick remaining
        if (selected.length < targetCount) {
            const usedIds = new Set(selected.map(q => q.id));
            const remaining = allQuestions.filter(q => !usedIds.has(q.id));
            const shuffledRemaining = shuffleArray(remaining);
            const needed = targetCount - selected.length;
            selected.push(...shuffledRemaining.slice(0, needed));
        }

        return shuffleArray(selected);
    }

    /**
     * Launch Quiz Selector Screen
     */
    function renderQuizSelector() {
        const selectorView = document.getElementById('ecoiq-selector-view');
        const activeView = document.getElementById('ecoiq-quiz-view');
        const resultView = document.getElementById('ecoiq-result-view');
        const historyContainer = document.getElementById('ecoiq-history-section');

        if (!selectorView) return;

        selectorView.classList.remove('hidden');
        if (activeView) activeView.classList.add('hidden');
        if (resultView) resultView.classList.add('hidden');

        renderAssessmentHistory();
    }

    /**
     * Start a new Quiz Session
     */
    function startQuiz(type = 'quick', category = null, explicitIds = null, isRetake = false) {
        const questions = generateQuestionSet(type, category, explicitIds);
        if (questions.length === 0) {
            window.showToast('No questions found for this quiz type.', 'alert-circle');
            return;
        }

        currentQuizSession = {
            id: 'att_' + Date.now(),
            type: type,
            category: category || 'Mixed Categories',
            isRetake: !!isRetake,
            questions: questions,
            startedAt: new Date().toISOString()
        };

        activeQuizType = type;
        activeQuizCategory = category;
        quizCurrentIndex = 0;
        quizUserAnswers = new Array(questions.length).fill(undefined);
        currentStreak = 0;
        highestSessionStreak = 0;

        // Switch to Quiz View
        const selectorView = document.getElementById('ecoiq-selector-view');
        const activeView = document.getElementById('ecoiq-quiz-view');
        const resultView = document.getElementById('ecoiq-result-view');

        if (selectorView) selectorView.classList.add('hidden');
        if (resultView) resultView.classList.add('hidden');
        if (activeView) activeView.classList.remove('hidden');

        renderCurrentQuestion();
    }

    /**
     * Render the active question in current quiz session
     */
    function renderCurrentQuestion() {
        if (!currentQuizSession || !currentQuizSession.questions) return;

        const total = currentQuizSession.questions.length;
        const q = currentQuizSession.questions[quizCurrentIndex];
        if (!q) return;

        // Update UI headers & counters
        const progressText = document.getElementById('iq-progress-text');
        if (progressText) progressText.textContent = `Question ${quizCurrentIndex + 1} of ${total}`;

        const catBadge = document.getElementById('iq-category-badge');
        if (catBadge) catBadge.textContent = q.category;

        const diffBadge = document.getElementById('iq-diff-badge');
        if (diffBadge) {
            diffBadge.textContent = q.difficulty || 'Standard';
            diffBadge.className = `badge badge-${(q.difficulty || 'Easy').toLowerCase()}`;
        }

        const fillBar = document.getElementById('iq-progress-fill');
        if (fillBar) {
            fillBar.style.width = `${((quizCurrentIndex + 1) / total) * 100}%`;
        }

        const streakBadge = document.getElementById('iq-streak-indicator');
        if (streakBadge) {
            if (currentStreak >= 2) {
                streakBadge.classList.remove('hidden');
                streakBadge.innerHTML = `🔥 ${currentStreak} streak!`;
            } else {
                streakBadge.classList.add('hidden');
            }
        }

        const scenarioEl = document.getElementById('iq-scenario');
        if (scenarioEl) scenarioEl.textContent = q.scenario || q.question;

        // Render Answer Options
        const optionsContainer = document.getElementById('iq-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            const selectedIdx = quizUserAnswers[quizCurrentIndex];
            const letters = ['A', 'B', 'C', 'D', 'E'];

            q.options.forEach((optText, idx) => {
                const isSelected = (selectedIdx === idx);
                const optDiv = document.createElement('div');
                optDiv.className = `iq-option ${isSelected ? 'selected' : ''}`;
                optDiv.innerHTML = `
                    <div class="iq-option-indicator">
                        <span class="iq-option-letter">${letters[idx] || (idx + 1)}</span>
                    </div>
                    <div class="iq-option-text">${optText}</div>
                    <div class="iq-option-check">
                        ${isSelected ? '<i data-lucide="check" style="width: 16px; height: 16px;"></i>' : ''}
                    </div>
                `;
                optDiv.onclick = () => selectOption(idx);
                optionsContainer.appendChild(optDiv);
            });
        }

        // Nav Buttons
        const prevBtn = document.getElementById('btn-prev-iq');
        if (prevBtn) prevBtn.disabled = (quizCurrentIndex === 0);

        const nextBtn = document.getElementById('btn-next-iq');
        if (nextBtn) {
            nextBtn.innerHTML = (quizCurrentIndex === total - 1)
                ? `Finish Assessment <i data-lucide="award"></i>`
                : `Next Question <i data-lucide="arrow-right"></i>`;
        }

        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * User clicks an option
     */
    function selectOption(index) {
        if (!currentQuizSession || !currentQuizSession.questions) return;
        
        // Prevent streak inflation if the user re-clicks the same option
        const prevSelected = quizUserAnswers[quizCurrentIndex];
        if (prevSelected === index) return;

        quizUserAnswers[quizCurrentIndex] = index;

        // Recalculate streak accurately from actual answers given up to quizCurrentIndex
        let tempStreak = 0;
        let maxStreak = 0;
        for (let i = 0; i <= quizCurrentIndex; i++) {
            const ans = quizUserAnswers[i];
            if (ans !== undefined) {
                const quest = currentQuizSession.questions[i];
                if (ans === quest.correctIndex) {
                    tempStreak++;
                    if (tempStreak > maxStreak) maxStreak = tempStreak;
                } else {
                    tempStreak = 0;
                }
            }
        }
        currentStreak = tempStreak;
        highestSessionStreak = Math.max(highestSessionStreak, maxStreak);

        renderCurrentQuestion();
    }

    /**
     * Previous question
     */
    function prevQuestion() {
        if (quizCurrentIndex > 0) {
            quizCurrentIndex--;
            renderCurrentQuestion();
        }
    }

    /**
     * Next or Finish Question
     */
    function nextQuestion() {
        if (quizUserAnswers[quizCurrentIndex] === undefined) {
            window.showToast('Please select an option before continuing.', 'alert-circle');
            return;
        }

        if (quizCurrentIndex < currentQuizSession.questions.length - 1) {
            quizCurrentIndex++;
            renderCurrentQuestion();
        } else {
            finishAssessment();
        }
    }

    /**
     * Complete Assessment & Calculate Results
     */
    function finishAssessment() {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const questions = currentQuizSession.questions;
        let correctCount = 0;
        const categoryTotals = {};
        const categoryCorrect = {};

        questions.forEach((q, idx) => {
            const chosen = quizUserAnswers[idx];
            const isCorrect = (chosen === q.correctIndex);

            if (!categoryTotals[q.category]) {
                categoryTotals[q.category] = 0;
                categoryCorrect[q.category] = 0;
            }
            categoryTotals[q.category]++;
            if (isCorrect) {
                correctCount++;
                categoryCorrect[q.category]++;
            }
        });

        const overallScore = Math.round((correctCount / questions.length) * 100);

        // Category breakdown percentages
        const categoryBreakdown = {};
        Object.keys(categoryTotals).forEach(cat => {
            categoryBreakdown[cat] = Math.round((categoryCorrect[cat] / categoryTotals[cat]) * 100);
        });

        // Determine Highest & Lowest Category
        let strongestCat = 'All Rounder';
        let weakestCat = 'General Habit';
        let maxPct = -1;
        let minPct = 101;

        Object.keys(categoryBreakdown).forEach(cat => {
            const pct = categoryBreakdown[cat];
            if (pct > maxPct) { maxPct = pct; strongestCat = cat; }
            if (pct < minPct) { minPct = pct; weakestCat = cat; }
        });

        // Performance Tier
        let tier = 'Eco Explorer';
        if (overallScore >= 90) tier = 'Eco Champion';
        else if (overallScore >= 75) tier = 'Eco Aware';
        else if (overallScore >= 50) tier = 'Eco Learner';

        // Construct Completed Attempt Object
        const attempt = {
            id: currentQuizSession.id,
            date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
            timeStr: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            quizType: currentQuizSession.type,
            category: currentQuizSession.category,
            isRetake: currentQuizSession.isRetake,
            score: overallScore,
            correctCount: correctCount,
            totalQuestions: questions.length,
            tier: tier,
            strongestCategory: strongestCat,
            weakestCategory: weakestCat,
            categoryScores: categoryBreakdown,
            questionIds: questions.map(q => q.id),
            userAnswers: [...quizUserAnswers],
            streak: highestSessionStreak
        };

        // Update User State & Persistence
        user.ecoIQ = overallScore;
        user.ecoIQCategoryScores = categoryBreakdown;
        user.ecoIQDetails = {
            tier,
            strongestCategory: strongestCat,
            weakestCategory: weakestCat,
            categoryBreakdown,
            lastCompletedDate: attempt.date
        };

        // Track highest streak
        if (highestSessionStreak > (user.highestQuizStreak || 0)) {
            user.highestQuizStreak = highestSessionStreak;
        }

        // Add to Assessment History (prepend)
        user.assessmentHistory = user.assessmentHistory || [];
        user.assessmentHistory.unshift(attempt);

        // Award completion XP (50 XP for assessment completion)
        user.xp = (user.xp || 0) + 50;

        window.EcoStorage.saveCurrentUser(user);
        window.showToast(`Assessment Complete! +50 EcoXP Awarded. Score: ${overallScore}%`, 'award');

        // Render Results Screen
        renderQuizResults(attempt);
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderProgressAnalytics) window.renderProgressAnalytics();
        if (window.renderProfile) window.renderProfile();
    }

    /**
     * Render the Rich Results Screen
     */
    function renderQuizResults(attempt) {
        const activeView = document.getElementById('ecoiq-quiz-view');
        const selectorView = document.getElementById('ecoiq-selector-view');
        const resultView = document.getElementById('ecoiq-result-view');

        if (activeView) activeView.classList.add('hidden');
        if (selectorView) selectorView.classList.add('hidden');
        if (!resultView) return;

        resultView.classList.remove('hidden');

        // Populate Result Numbers
        const scoreEl = document.getElementById('iq-res-score');
        if (scoreEl) scoreEl.textContent = `${attempt.score}%`;

        const tierEl = document.getElementById('iq-res-tier');
        if (tierEl) tierEl.textContent = attempt.tier;

        const summaryEl = document.getElementById('iq-res-summary');
        if (summaryEl) {
            summaryEl.textContent = `You correctly answered ${attempt.correctCount} out of ${attempt.totalQuestions} scenario questions in the ${attempt.category} assessment.`;
        }

        // Category Breakdown Bars
        const catContainer = document.getElementById('iq-category-breakdown');
        if (catContainer) {
            catContainer.innerHTML = '';
            Object.keys(attempt.categoryScores || {}).forEach(cat => {
                const pct = attempt.categoryScores[cat];
                catContainer.innerHTML += `
                    <div style="margin-bottom: 0.95rem;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.35rem;">
                            <span>${cat}</span>
                            <span style="color: var(--accent-primary); font-weight: 700;">${pct}%</span>
                        </div>
                        <div class="progress-bar-container" style="height: 8px;">
                            <div class="progress-fill" style="width: ${pct}%;"></div>
                        </div>
                    </div>
                `;
            });
        }

        // Strongest vs Needs Work Cards
        const strongEl = document.getElementById('iq-res-strong');
        if (strongEl) strongEl.textContent = attempt.strongestCategory;

        const weakEl = document.getElementById('iq-res-weak');
        if (weakEl) weakEl.textContent = attempt.weakestCategory;

        // Recommendations based on weak area
        const recSection = document.getElementById('iq-res-recommendation');
        if (recSection) {
            const allTopics = window.EcoData.topics || [];
            const recTopic = allTopics.find(t => t.category.toLowerCase().includes(attempt.weakestCategory.toLowerCase().split(' ')[0])) || allTopics[0];
            
            recSection.innerHTML = `
                <div style="background: var(--light-green); border-left: 4px solid var(--forest-green); padding: 1.25rem; border-radius: var(--radius-sm); margin-top: 1.5rem;">
                    <strong style="color: var(--forest-green); display: block; margin-bottom: 0.35rem; font-size: 0.95rem;">
                        <i data-lucide="compass" style="width:16px; vertical-align:middle;"></i> Recommended Next Learning Step:
                    </strong>
                    <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.75rem;">
                        Boost your understanding in <strong>${attempt.weakestCategory}</strong> with our practical module: <em>"${recTopic.title}"</em>.
                    </p>
                    <button class="btn btn-outline btn-sm" onclick="openTopicModal('${recTopic.id}')">
                        <i data-lucide="book-open"></i> Study Recommended Lesson
                    </button>
                </div>
            `;
        }

        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * Action 1: Review Detailed Question-by-Question Answers
     */
    function reviewAnswers(attemptId = null) {
        const user = window.EcoStorage.getCurrentUser();
        if (!user) return;

        let attempt = null;
        if (attemptId && user.assessmentHistory) {
            attempt = user.assessmentHistory.find(a => a.id === attemptId);
        } else if (user.assessmentHistory && user.assessmentHistory.length > 0) {
            attempt = user.assessmentHistory[0];
        }

        if (!attempt || !attempt.questionIds) {
            window.showToast('No assessment data available to review.', 'info');
            return;
        }

        const modal = document.getElementById('quiz-review-modal');
        const container = document.getElementById('quiz-review-list');
        if (!modal || !container) return;

        container.innerHTML = '';

        const allQuestions = window.EcoData.ecoIQQuestions || [];

        attempt.questionIds.forEach((qId, idx) => {
            const q = allQuestions.find(item => item.id === qId);
            if (!q) return;

            const userChoiceIdx = attempt.userAnswers[idx];
            const isCorrect = (userChoiceIdx === q.correctIndex);
            const userChoiceText = q.options[userChoiceIdx] || 'No answer selected';
            const correctText = q.options[q.correctIndex];

            container.innerHTML += `
                <div class="card" style="margin-bottom: 1.25rem; border-left: 4px solid ${isCorrect ? 'var(--forest-green)' : '#ef4444'}; padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                        <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted);">Question ${idx + 1} • ${q.category}</span>
                        <span class="badge ${isCorrect ? 'badge-eco' : 'badge-energy'}" style="font-size: 0.8rem;">
                            ${isCorrect ? '✓ Correct (+1)' : '✗ Incorrect'}
                        </span>
                    </div>

                    <p style="font-weight: 600; color: var(--text-main); margin-bottom: 0.75rem; font-size: 0.95rem; line-height: 1.5;">
                        ${q.scenario || q.question}
                    </p>

                    <div style="background: var(--warm-cream); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.88rem; margin-bottom: 0.75rem; border: 1px solid var(--border-color);">
                        <div style="margin-bottom: 0.35rem;">
                            <strong style="color: ${isCorrect ? 'var(--forest-green)' : '#b91c1c'};">Your Answer:</strong> ${userChoiceText}
                        </div>
                        ${!isCorrect ? `<div><strong style="color: var(--forest-green);">Correct Answer:</strong> ${correctText}</div>` : ''}
                    </div>

                    <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                        <strong style="color: var(--text-main);">Why:</strong> ${q.explanation}
                    </div>
                </div>
            `;
        });

        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * Action 2: Retake EXACT SAME Assessment
     */
    function retakeAssessment(attemptId = null) {
        const user = window.EcoStorage.getCurrentUser();
        if (!user) return;

        let attempt = null;
        if (attemptId && user.assessmentHistory) {
            attempt = user.assessmentHistory.find(a => a.id === attemptId);
        } else if (user.assessmentHistory && user.assessmentHistory.length > 0) {
            attempt = user.assessmentHistory[0];
        }

        if (!attempt || !attempt.questionIds || attempt.questionIds.length === 0) {
            window.showToast('Starting a new assessment session...', 'info');
            startQuiz('quick');
            return;
        }

        window.showToast('Reloading exact question set for retake...', 'refresh-cw');
        startQuiz(attempt.quizType, attempt.category, attempt.questionIds, true);
    }

    /**
     * Action 3: Start New Assessment (Generates Fresh Randomized Pool)
     */
    function startNewAssessment() {
        renderQuizSelector();
    }

    /**
     * Render the Assessment History List
     */
    function renderAssessmentHistory() {
        const container = document.getElementById('ecoiq-history-list');
        if (!container) return;

        const user = window.EcoStorage.getCurrentUser();
        const history = (user && user.assessmentHistory) || [];

        if (history.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <i data-lucide="history" style="width: 32px; height: 32px; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                    <p style="font-size: 0.9rem;">No previous assessments recorded yet. Choose a quiz above to get started!</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        container.innerHTML = '';
        history.forEach((att, idx) => {
            container.innerHTML += `
                <div class="card" style="padding: 1.15rem 1.5rem; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
                            <span class="badge badge-category">${att.quizType === 'full' ? '20Q Full EcoIQ' : att.quizType === 'category' ? att.category : '10Q Quick Check'}</span>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">${att.date} at ${att.timeStr || ''}</span>
                        </div>
                        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.2rem;">
                            Score: <span style="color: var(--forest-green); font-weight: 800;">${att.score}%</span> • <span style="color: var(--text-muted); font-size: 0.9rem;">${att.tier}</span>
                        </h4>
                        <span style="font-size: 0.82rem; color: var(--text-muted);">
                            Answered ${att.correctCount} of ${att.totalQuestions} questions correctly • Top Category: ${att.strongestCategory}
                        </span>
                    </div>

                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button class="btn btn-outline btn-sm" onclick="EcoQuiz.reviewAnswers('${att.id}')">
                            <i data-lucide="eye"></i> Review
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="EcoQuiz.retakeAssessment('${att.id}')" title="Retake exact same questions">
                            <i data-lucide="rotate-ccw"></i> Retake
                        </button>
                    </div>
                </div>
            `;
        });

        if (window.lucide) window.lucide.createIcons();
    }

    // Expose Global Quiz API
    window.EcoQuiz = {
        renderQuizSelector,
        startQuiz,
        renderCurrentQuestion,
        selectOption,
        prevQuestion,
        nextQuestion,
        finishAssessment,
        reviewAnswers,
        retakeAssessment,
        startNewAssessment,
        renderAssessmentHistory
    };

    // Backward-compatibility aliases
    window.renderEcoIQ = renderQuizSelector;
    window.selectEcoIQOption = selectOption;
    window.prevIQQuestion = prevQuestion;
    window.nextIQQuestion = nextQuestion;
})();
