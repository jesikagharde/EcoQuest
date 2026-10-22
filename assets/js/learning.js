/**
 * ECOQUEST LEARNING TOPICS MODULE (assets/js/learning.js)
 * Implements topic discovery, category filters, interactive multi-step reading flow,
 * scenario knowledge check evaluations, and completion XP awarding.
 */
(function() {
    let currentTopicId = null;
    let selectedKnowledgeCheckIndex = null;

    /**
     * Render the Topics Library Grid
     */
    function renderTopics() {
        const container = document.getElementById('topics-grid');
        if (!container) return;

        const catFilterEl = document.getElementById('topic-filter-category');
        const searchInput = document.getElementById('topic-search-input');
        const selectedCat = catFilterEl ? catFilterEl.value : 'all';
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const allTopics = window.EcoData.topics || [];

        let filtered = allTopics.filter(t => {
            if (selectedCat !== 'all' && !t.category.toLowerCase().includes(selectedCat.toLowerCase())) {
                return false;
            }
            if (searchQuery) {
                const matchTitle = t.title.toLowerCase().includes(searchQuery);
                const matchDesc = t.shortDescription.toLowerCase().includes(searchQuery);
                const matchCat = t.category.toLowerCase().includes(searchQuery);
                if (!matchTitle && !matchDesc && !matchCat) return false;
            }
            return true;
        });

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i data-lucide="book-x" style="width: 44px; height: 44px; color: var(--text-muted); margin: 0 auto 1rem auto;"></i>
                    <h3>No topics found matching your filter</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Try choosing another category or clearing your search query.</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        filtered.forEach(topic => {
            const userProgress = (user.topicProgress && user.topicProgress[topic.id]) || { status: 'Not Started' };
            const isCompleted = (userProgress.status === 'Completed');
            const isInProgress = (userProgress.status === 'In Progress');
            const isBookmarked = (user.bookmarks && user.bookmarks.topics && user.bookmarks.topics.includes(topic.id));

            let statusBadge = `<span class="status-badge status-available">Not Started</span>`;
            if (isInProgress) statusBadge = `<span class="status-badge status-in-progress">In Progress</span>`;
            if (isCompleted) statusBadge = `<span class="status-badge status-completed">✓ Completed</span>`;

            container.innerHTML += `
                <div class="card topic-card">
                    <div class="topic-card-header">
                        <span class="badge badge-category">${topic.category}</span>
                        <div class="topic-card-actions">
                            ${statusBadge}
                            <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('topics', '${topic.id}')" title="Bookmark Topic">
                                <i data-lucide="bookmark" style="${isBookmarked ? 'color: var(--accent-primary); fill: var(--accent-primary);' : 'color: var(--text-muted);'} width:16px; height:16px;"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="topic-card-title">${topic.title}</h3>
                    <p class="topic-card-desc">
                        ${topic.shortDescription}
                    </p>

                    <div style="display: flex; gap: 0.75rem; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                        <span><i data-lucide="clock" style="width:13px; vertical-align:middle;"></i> ${topic.estimatedTime}</span>
                        <span><i data-lucide="bar-chart-2" style="width:13px; vertical-align:middle;"></i> ${topic.difficulty}</span>
                        <span><i data-lucide="award" style="width:13px; vertical-align:middle;"></i> +${topic.xpReward} XP</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.85rem; margin-top: auto;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: ${isCompleted ? 'var(--accent-primary)' : 'var(--text-muted)'};">
                            ${isCompleted ? '✓ Passed' : isInProgress ? 'Resume Lesson' : 'Start Reading'}
                        </span>
                        <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="EcoLearning.openTopicModal('${topic.id}')">
                            <i data-lucide="${isCompleted ? 'rotate-ccw' : 'book-open'}"></i> ${isCompleted ? 'Review' : 'Open Lesson'}
                        </button>
                    </div>
                </div>
            `;
        });

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Open the In-Depth Interactive Topic Modal
     */
    function openTopicModal(topicId) {
        const allTopics = window.EcoData.topics || [];
        const topic = allTopics.find(t => t.id === topicId);
        if (!topic) return;

        currentTopicId = topicId;
        selectedKnowledgeCheckIndex = null;

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        
        // Mark as In Progress if not already completed
        if (!user.topicProgress[topicId] || user.topicProgress[topicId].status !== 'Completed') {
            user.topicProgress[topicId] = {
                status: 'In Progress',
                progressPercent: 50,
                startedAt: new Date().toISOString()
            };
            window.EcoStorage.saveCurrentUser(user);
        }

        const isCompleted = (user.topicProgress[topicId]?.status === 'Completed');

        // Populate Modal Fields
        const modal = document.getElementById('topic-modal');
        if (!modal) return;

        document.getElementById('modal-topic-title').textContent = topic.title;
        document.getElementById('modal-topic-category').textContent = topic.category;
        document.getElementById('modal-topic-meta').textContent = `${topic.estimatedTime} • ${topic.difficulty} • +${topic.xpReward} XP`;
        document.getElementById('modal-topic-desc').textContent = topic.whyItMatters;

        // Key Points List
        const keyPointsContainer = document.getElementById('modal-topic-keypoints');
        if (keyPointsContainer) {
            keyPointsContainer.innerHTML = topic.keyPoints.map(pt => `
                <li style="margin-bottom: 0.5rem; line-height: 1.55; color: var(--text-main);">
                    ${pt}
                </li>
            `).join('');
        }

        // Everyday Examples & Tips
        const examplesContainer = document.getElementById('modal-topic-examples');
        if (examplesContainer) {
            examplesContainer.innerHTML = topic.everydayExamples.map(ex => `
                <div style="background: var(--warm-cream); border-left: 3px solid var(--forest-green); padding: 0.65rem 0.85rem; border-radius: 4px; margin-bottom: 0.5rem; font-size: 0.88rem; color: var(--text-main);">
                    <i data-lucide="check" style="width:13px; color: var(--forest-green); vertical-align:middle; margin-right: 4px;"></i> ${ex}
                </div>
            `).join('');
        }

        // Knowledge Check Section
        const kcContainer = document.getElementById('modal-topic-knowledge-check');
        const kc = topic.knowledgeCheck;

        if (kcContainer && kc) {
            const letters = ['A', 'B', 'C', 'D', 'E'];
            kcContainer.innerHTML = `
                <div style="background: var(--accent-soft); border: 1.5px solid var(--accent-border); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
                    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.85rem; justify-content: space-between; flex-wrap: wrap;">
                        <div style="display: flex; gap: 0.45rem; align-items: center;">
                            <i data-lucide="help-circle" style="color: var(--accent-primary); width: 20px; height: 20px;"></i>
                            <strong style="color: var(--accent-primary); font-size: 1rem;">Interactive Knowledge Check</strong>
                        </div>
                        <span id="kc-status-badge" class="badge ${isCompleted ? 'badge-easy' : 'badge-category'}">
                            ${isCompleted ? '✓ Completed (+XP Awarded)' : 'Quick Check'}
                        </span>
                    </div>

                    <p style="font-weight: 600; font-size: 0.98rem; color: var(--text-main); margin-bottom: 1.15rem; line-height: 1.5;">
                        ${kc.question}
                    </p>

                    <div id="kc-options-list" class="iq-options" style="gap: 0.65rem; margin-bottom: 1.25rem;">
                        ${kc.options.map((opt, idx) => `
                            <div class="iq-option ${isCompleted && idx === kc.correctIndex ? 'selected' : ''}" style="padding: 0.85rem 1.15rem; background: var(--pure-white);" onclick="EcoLearning.selectKCOption(${idx})">
                                <div class="iq-option-indicator">
                                    <span class="iq-option-letter">${letters[idx] || (idx + 1)}</span>
                                </div>
                                <div class="iq-option-text" style="font-size: 0.92rem;">${opt}</div>
                                <div class="iq-option-check">
                                    ${isCompleted && idx === kc.correctIndex ? '<i data-lucide="check" style="width: 16px; height: 16px;"></i>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div id="kc-feedback-banner" class="hidden" style="padding: 0.9rem 1.1rem; border-radius: var(--radius-sm); font-size: 0.9rem; margin-bottom: 1.15rem; line-height: 1.5;"></div>

                    <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm" id="btn-submit-kc" onclick="EcoLearning.submitKnowledgeCheck()">
                        <i data-lucide="check-circle"></i> ${isCompleted ? '✓ Lesson Completed (+30 XP Earned)' : 'Submit Answer & Complete Topic (+30 XP)'}
                    </button>
                </div>
            `;
        }

        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * User clicks an option in the Knowledge Check
     */
    function selectKCOption(index) {
        selectedKnowledgeCheckIndex = index;
        const options = document.querySelectorAll('#kc-options-list .iq-option');
        options.forEach((opt, idx) => {
            const checkEl = opt.querySelector('.iq-option-check');
            if (idx === index) {
                opt.classList.add('selected');
                if (checkEl) checkEl.innerHTML = '<i data-lucide="check" style="width: 16px; height: 16px;"></i>';
            } else {
                opt.classList.remove('selected');
                if (checkEl) checkEl.innerHTML = '';
            }
        });
        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * Submit the Knowledge Check
     */
    function submitKnowledgeCheck() {
        if (!currentTopicId) return;
        const allTopics = window.EcoData.topics || [];
        const topic = allTopics.find(t => t.id === currentTopicId);
        if (!topic || !topic.knowledgeCheck) return;

        if (selectedKnowledgeCheckIndex === null) {
            window.showToast('Please select an answer choice before submitting.', 'alert-circle');
            return;
        }

        const isCorrect = (selectedKnowledgeCheckIndex === topic.knowledgeCheck.correctIndex);
        const feedback = document.getElementById('kc-feedback-banner');
        const submitBtn = document.getElementById('btn-submit-kc');
        const statusBadge = document.getElementById('kc-status-badge');

        if (feedback) {
            feedback.classList.remove('hidden');
            if (isCorrect) {
                feedback.style.background = 'var(--accent-soft)';
                feedback.style.border = '1px solid var(--accent-border)';
                feedback.style.color = 'var(--accent-primary)';
                feedback.innerHTML = `<strong>✓ Correct!</strong> ${topic.knowledgeCheck.explanation}`;
            } else {
                feedback.style.background = '#fef2f2';
                feedback.style.border = '1px solid #fca5a5';
                feedback.style.color = '#991b1b';
                feedback.innerHTML = `<strong>✗ Not quite.</strong> ${topic.knowledgeCheck.explanation} <br><span style="font-size: 0.85rem; margin-top: 0.35rem; display: inline-block;">Please select the correct option above to complete this lesson.</span>`;
            }
        }

        if (isCorrect) {
            const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
            const wasAlreadyCompleted = (user.topicProgress[currentTopicId]?.status === 'Completed');

            user.topicProgress[currentTopicId] = {
                status: 'Completed',
                progressPercent: 100,
                completedAt: new Date().toLocaleDateString()
            };

            // Award XP once
            if (!wasAlreadyCompleted) {
                user.xp = (user.xp || 0) + topic.xpReward;
                window.EcoStorage.saveCurrentUser(user);
                window.showToast(`Lesson Mastered! +${topic.xpReward} EcoXP Earned`, 'award');
            }

            if (submitBtn) {
                submitBtn.className = 'btn btn-secondary btn-sm';
                submitBtn.innerHTML = `<i data-lucide="check-circle"></i> ✓ Lesson Completed (+${topic.xpReward} XP Earned)`;
            }

            if (statusBadge) {
                statusBadge.className = 'badge badge-easy';
                statusBadge.textContent = '✓ Completed (+XP Awarded)';
            }

            renderTopics();
            if (window.renderDashboard) window.renderDashboard();
            if (window.renderProgressAnalytics) window.renderProgressAnalytics();
            if (window.renderProfile) window.renderProfile();
            if (window.updateNavHeader) window.updateNavHeader();
            if (window.lucide) window.lucide.createIcons();
        }
    }

    // Expose API
    window.EcoLearning = {
        renderTopics,
        openTopicModal,
        selectKCOption,
        submitKnowledgeCheck
    };

    // Backward-compatibility aliases
    window.renderLearnTopics = renderTopics;
    window.openTopicModal = openTopicModal;
})();
