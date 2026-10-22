/**
 * ECOQUEST MASTER APPLICATION CONTROLLER (assets/js/app.js)
 * Coordinates routing, dashboard, dynamic journey, community challenges,
 * global discovery search, personalization theme/accent engines, 3D card physics, and modals.
 */

// Global App State
let currentUser = null;
let currentActiveView = 'view-dashboard';

// Initialize EcoQuest Application
document.addEventListener('DOMContentLoaded', () => {
    initEcoQuestApp();
});

function initEcoQuestApp() {
    // 1. Session Verification & Auth Guard
    currentUser = window.EcoStorage.getCurrentUser();

    // If on app.html and no user is logged in, redirect to login page (index.html)
    const isAppPage = window.location.pathname.includes('app.html') || document.getElementById('view-dashboard');
    if (isAppPage) {
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }
    }

    if (!currentUser) return;

    // 2. Apply Saved Accent Palette Preference
    const savedAccent = localStorage.getItem(window.EcoStorage.STORAGE_KEYS.ACCENT) || currentUser.accent || 'forest';
    applyAccent(savedAccent);

    // 3. Apply Sidebar Preference
    const savedSidebar = localStorage.getItem(window.EcoStorage.STORAGE_KEYS.SIDEBAR);
    if (savedSidebar === 'collapsed' || currentUser.sidebarCollapsed) {
        collapseSidebar(true);
    }

    // 4. Initialize Topbar & Navigation UI
    updateNavHeader();
    setupNavigationListeners();
    setupGlobalSearchListener();

    // 5. Initialize Sub-module Components
    if (window.EcoCreate && window.EcoCreate.initMaterialsSelector) {
        window.EcoCreate.initMaterialsSelector();
    }
    if (window.EcoLens && window.EcoLens.setupDropzone) {
        window.EcoLens.setupDropzone();
    }

    // 6. Route to Initial View
    const urlParams = new URLSearchParams(window.location.search);
    const initialView = urlParams.get('view') || 'view-dashboard';
    navigateTo(initialView);

    // 7. Initialize 3D Card Physics & Lucide Icons
    if (window.lucide) window.lucide.createIcons();
    init3DCardPhysics();
}
window.initEcoQuestApp = initEcoQuestApp;

// ==========================================
// 1. NAVIGATION & VIEW ROUTING
// ==========================================
function navigateTo(targetViewId) {
    const allViews = document.querySelectorAll('.view-section');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    allViews.forEach(view => {
        if (view.id === targetViewId) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });

    let pageTitle = 'Dashboard';
    navItems.forEach(item => {
        if (item.dataset.target === targetViewId) {
            item.classList.add('active');
            pageTitle = item.dataset.title || 'EcoQuest';
        } else {
            item.classList.remove('active');
        }
    });

    const titleEl = document.getElementById('current-page-title');
    if (titleEl) titleEl.textContent = pageTitle;

    currentActiveView = targetViewId;
    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Execute targeted view rendering logic
    switch (targetViewId) {
        case 'view-dashboard':
            renderDashboard();
            break;
        case 'view-ecoiq':
            if (window.EcoQuiz) window.EcoQuiz.renderQuizSelector();
            break;
        case 'view-journey':
            renderJourney();
            break;
        case 'view-learn':
            if (window.EcoLearning) window.EcoLearning.renderTopics();
            break;
        case 'view-missions':
            if (window.EcoMissions) window.EcoMissions.renderMissions();
            break;
        case 'view-create':
            if (window.EcoCreate) window.EcoCreate.filterCreativeProjects();
            break;
        case 'view-ecolens':
            if (window.EcoLens) window.EcoLens.renderEcoLens();
            break;
        case 'view-progress':
            if (window.EcoProgress) window.EcoProgress.renderProgressAnalytics();
            break;
        case 'view-bookmarks':
            if (window.EcoBookmarks) window.EcoBookmarks.renderBookmarks();
            break;
        case 'view-profile':
            if (window.EcoProfile) window.EcoProfile.renderProfile();
            break;
        case 'view-settings':
            renderSettings();
            break;
    }

    if (window.lucide) window.lucide.createIcons();
    init3DCardPhysics();
}
window.navigateTo = navigateTo;

function setupNavigationListeners() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            if (target) navigateTo(target);
        });
    });
}

function updateNavHeader() {
    currentUser = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
    const navName = document.getElementById('nav-name');
    const navAvatar = document.getElementById('nav-avatar');

    if (navName) navName.textContent = currentUser.name || 'User';
    if (navAvatar) {
        navAvatar.textContent = currentUser.avatarInitial || (currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U');
    }
}

// ==========================================
// 2. DASHBOARD MODULE
// ==========================================
function renderDashboard() {
    currentUser = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

    // 1. Personalized Greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    else if (hour >= 17) timeGreeting = 'Good evening';

    const dashGreeting = document.getElementById('dash-greeting');
    if (dashGreeting) {
        dashGreeting.textContent = `${timeGreeting}, ${currentUser.name.split(' ')[0] || 'Explorer'}`;
    }

    const dashName = document.getElementById('dash-name');
    if (dashName) dashName.textContent = currentUser.name.split(' ')[0] || 'User';

    // 2. Real Calculated Metric Cards
    const statIq = document.getElementById('stat-iq');
    const statIqLabel = document.getElementById('stat-iq-label');
    if (statIq) {
        if (typeof currentUser.ecoIQ === 'number') {
            statIq.textContent = `${currentUser.ecoIQ}%`;
            if (statIqLabel) statIqLabel.textContent = currentUser.ecoIQDetails?.tier || 'Eco Aware';
        } else {
            statIq.textContent = 'Pending';
            if (statIqLabel) statIqLabel.textContent = 'Take Assessment';
        }
    }

    const statXp = document.getElementById('stat-xp');
    const statXpLevel = document.getElementById('stat-xp-level');
    if (statXp) statXp.textContent = `${currentUser.xp || 0} XP`;
    if (statXpLevel) statXpLevel.textContent = `Level ${currentUser.level || 1} • ${(currentUser.xp >= 1000 ? 'Planet Protector' : currentUser.xp >= 650 ? 'Eco Explorer' : currentUser.xp >= 350 ? 'Sapling' : currentUser.xp >= 150 ? 'Sprout' : 'Seedling')}`;

    const missionsDone = Object.values(currentUser.missionProgress || {}).filter(m => m.status === 'Completed').length;
    const statMissions = document.getElementById('stat-missions');
    if (statMissions) statMissions.textContent = `${missionsDone}`;

    const projectsDone = Object.values(currentUser.creativeProgress || {}).filter(p => p.status === 'Completed').length;
    const statProjects = document.getElementById('stat-projects');
    if (statProjects) statProjects.textContent = `${projectsDone}`;

    // 3. Priority Focus Banner
    renderDashboardFocusBanner();

    // 4. In-Progress Missions Section
    renderDashboardActiveMissions();

    // 5. Daily Quick Quest Button State
    const todayStr = new Date().toISOString().split('T')[0];
    const questBtn = document.getElementById('btn-quick-quest');
    if (questBtn) {
        if (currentUser.quickQuestCompletedDate === todayStr) {
            questBtn.disabled = true;
            questBtn.className = 'btn btn-secondary';
            questBtn.innerHTML = `<i data-lucide="check-circle"></i> Completed for Today (+10 XP)`;
        } else {
            questBtn.disabled = false;
            questBtn.className = 'btn btn-outline';
            questBtn.innerHTML = `<i data-lucide="zap"></i> Complete Quick Quest (+10 XP)`;
        }
    }

    if (window.lucide) window.lucide.createIcons();
    init3DCardPhysics();
}
window.renderDashboard = renderDashboard;

function renderDashboardFocusBanner() {
    const container = document.getElementById('dash-focus-banner');
    if (!container) return;

    if (typeof currentUser.ecoIQ !== 'number') {
        container.innerHTML = `
            <div class="card" style="background: linear-gradient(135deg, var(--light-green), var(--warm-cream)); border: 1.5px solid var(--forest-green); padding: 1.5rem 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.75rem;">
                <div>
                    <span class="badge badge-category" style="margin-bottom: 0.35rem;">
                        <i data-lucide="sparkles" style="width:12px;"></i> Priority First Step
                    </span>
                    <h3 style="font-size: 1.25rem; color: var(--forest-green); margin: 0.2rem 0;">Discover Your Personal EcoIQ Baseline</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0; max-width: 600px;">
                        Take the 10-question scenario assessment to benchmark your awareness across waste, energy, water, and circular habits.
                    </p>
                </div>
                <button class="btn btn-primary" onclick="navigateTo('view-ecoiq')">
                    <i data-lucide="brain-circuit"></i> Start EcoIQ Check (+50 XP)
                </button>
            </div>
        `;
        return;
    }

    // If assessment done, recommend next topic from weakest category
    const weakCat = (currentUser.ecoIQDetails?.weakestCategory || 'Waste').split(' ')[0];
    const allTopics = window.EcoData.topics || [];
    const nextTopic = allTopics.find(t => t.category.includes(weakCat) && currentUser.topicProgress[t.id]?.status !== 'Completed') || allTopics[0];

    container.innerHTML = `
        <div class="card" style="background: var(--pure-white); border-left: 5px solid var(--forest-green); padding: 1.35rem 1.6rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.75rem;">
            <div>
                <span class="badge badge-category" style="margin-bottom: 0.35rem;">
                    <i data-lucide="target" style="width:12px;"></i> Recommended Focus: ${weakCat}
                </span>
                <h3 style="font-size: 1.2rem; color: var(--text-main); margin: 0.2rem 0;">${nextTopic.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0; max-width: 640px;">
                    ${nextTopic.shortDescription}
                </p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="EcoLearning.openTopicModal('${nextTopic.id}')">
                <i data-lucide="book-open"></i> Continue Learning
            </button>
        </div>
    `;
}

function renderDashboardActiveMissions() {
    const container = document.getElementById('dash-active-missions-banner');
    if (!container) return;

    const allMissions = window.EcoData.missions || [];
    const inProgress = allMissions.filter(m => currentUser.missionProgress[m.id]?.status === 'In Progress');

    if (inProgress.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="card" style="background: var(--warm-cream); border: 1.5px solid var(--border-color); padding: 1.25rem 1.5rem; margin-top: 1.5rem; margin-bottom: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
                <strong style="color: var(--text-main); font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;">
                    <i data-lucide="play-circle" style="color: var(--forest-green); width: 17px;"></i> Active Missions in Progress (${inProgress.length})
                </strong>
                <a href="javascript:void(0)" onclick="navigateTo('view-missions')" style="font-size: 0.82rem; color: var(--forest-green); font-weight: 700;">View All Missions →</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${inProgress.map(m => `
                    <div style="background: var(--pure-white); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <div>
                            <strong style="font-size: 0.9rem; color: var(--text-main);">${m.title}</strong>
                            <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 0.5rem;">${m.time} • ${m.category}</span>
                        </div>
                        <button class="btn btn-primary btn-sm" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="EcoMissions.completeMission('${m.id}', ${m.xp})">
                            <i data-lucide="check-circle" style="width:13px;"></i> Complete (+${m.xp} XP)
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function completeQuickQuest() {
    const todayStr = new Date().toISOString().split('T')[0];
    if (currentUser.quickQuestCompletedDate === todayStr) {
        showToast('You already completed your Quick Quest today!', 'info');
        return;
    }

    currentUser.xp = (currentUser.xp || 0) + 10;
    currentUser.quickQuestCompletedDate = todayStr;
    window.EcoStorage.saveCurrentUser(currentUser);

    showToast('Daily Quick Quest complete! +10 EcoXP earned', 'zap');
    renderDashboard();
}
window.completeQuickQuest = completeQuickQuest;

// ==========================================
// 3. DYNAMIC MY ECO JOURNEY MODULE (8 STAGES)
// ==========================================
function checkJourneyRequirement(req, user) {
    if (!req) return false;
    if (req.type === 'ecoiq') {
        return (typeof user.ecoIQ === 'number' && user.ecoIQ > 0) || 
               (Array.isArray(user.assessmentHistory) && user.assessmentHistory.length > 0);
    }
    if (req.type === 'topic') {
        return !!(user.topicProgress && user.topicProgress[req.targetId]?.status === 'Completed');
    }
    if (req.type === 'mission') {
        return !!(user.missionProgress && user.missionProgress[req.targetId]?.status === 'Completed');
    }
    if (req.type === 'project') {
        return !!(user.creativeProgress && user.creativeProgress[req.targetId]?.status === 'Completed');
    }
    return false;
}

function renderJourney() {
    const container = document.getElementById('journey-timeline');
    if (!container) return;

    currentUser = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
    const stages = window.EcoData.journeyStages || [];

    container.innerHTML = '';
    let foundActiveFocus = false;

    stages.forEach((stage) => {
        const totalReqs = stage.requirements ? stage.requirements.length : 3;
        const metReqs = stage.requirements ? stage.requirements.filter(r => checkJourneyRequirement(r, currentUser)).length : 0;
        const isStageCompleted = (metReqs === totalReqs);

        let isCurrent = false;
        let isLocked = false;

        if (isStageCompleted) {
            // Stage is completed
        } else if (!foundActiveFocus) {
            isCurrent = true;
            foundActiveFocus = true;
        } else {
            isLocked = true;
        }

        const progressPercent = Math.round((metReqs / totalReqs) * 100);

        let nodeClass = 'timeline-node';
        if (isStageCompleted) nodeClass += ' completed';
        else if (isCurrent) nodeClass += ' active';
        else if (isLocked) nodeClass += ' locked';

        const reqListHTML = stage.requirements ? stage.requirements.map(req => {
            const isDone = checkJourneyRequirement(req, currentUser);
            return `
                <div class="journey-req-item ${isDone ? 'done' : ''}">
                    <span class="journey-req-icon ${isDone ? 'done' : 'pending'}">${isDone ? '✓' : '○'}</span>
                    <span style="${isDone ? 'text-decoration: line-through; opacity: 0.8;' : 'font-weight: 600;'}">${req.label}</span>
                </div>
            `;
        }).join('') : '';

        let actionBtnHTML = '';
        if (isStageCompleted) {
            actionBtnHTML = `
                <span class="badge" style="background: #ecfdf5; color: #047857; font-size: 0.88rem; padding: 0.45rem 0.9rem;">
                    ✓ Stage Mastered (+150 EcoXP)
                </span>
            `;
        } else if (isCurrent) {
            actionBtnHTML = `
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap; width: 100%;">
                    <button class="btn btn-primary btn-sm" onclick="navigateTo('view-learn')">
                        <i data-lucide="book-open"></i> Complete Lessons
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="navigateTo('view-missions')">
                        <i data-lucide="target"></i> Complete Missions
                    </button>
                </div>
            `;
        } else {
            actionBtnHTML = `
                <span style="font-size: 0.82rem; color: var(--text-muted);">
                    <i data-lucide="lock" style="width:13px; vertical-align:middle;"></i> Complete preceding stage to unlock
                </span>
            `;
        }

        container.innerHTML += `
            <div class="${nodeClass}" style="margin-bottom: 2rem; position: relative; padding-left: 2rem;">
                <div class="timeline-indicator" style="position: absolute; left: -14px; top: 0; width: 28px; height: 28px; border-radius: 50%; background: ${isStageCompleted ? '#10b981' : isCurrent ? 'var(--accent-primary)' : 'var(--border-color)'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">
                    ${isStageCompleted ? '✓' : stage.stage}
                </div>

                <div class="card journey-stage-card ${isStageCompleted ? 'stage-completed' : isCurrent ? 'stage-active' : 'stage-locked'}" style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                        <span class="badge badge-category">Stage ${stage.stage} of 8 • ${stage.category}</span>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 0.82rem; font-weight: 700; color: ${isStageCompleted ? '#10b981' : isCurrent ? 'var(--accent-primary)' : 'var(--text-muted)'};">
                                ${isStageCompleted ? '✓ Completed' : isCurrent ? `⚡ Active (${metReqs}/${totalReqs} completed)` : '🔒 Locked'}
                            </span>
                        </div>
                    </div>

                    <h3 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 0.35rem;">${stage.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.55; margin-bottom: 1rem;">${stage.desc}</p>

                    <!-- Requirements Checklist -->
                    <div class="journey-req-list">
                        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 0.25rem;">
                            Stage Requirements (${metReqs}/${totalReqs})
                        </span>
                        ${reqListHTML}
                    </div>

                    <!-- Progress Bar -->
                    <div style="margin-bottom: 1rem;">
                        <div class="progress-bar-container" style="height: 6px; background: var(--border-color); border-radius: 99px; overflow: hidden;">
                            <div style="width: ${progressPercent}%; height: 100%; background: ${isStageCompleted ? '#10b981' : 'var(--accent-primary)'}; transition: width 0.3s ease;"></div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color-subtle); padding-top: 0.85rem;">
                        ${actionBtnHTML}
                    </div>
                </div>
            </div>
        `;
    });

    if (window.lucide) window.lucide.createIcons();
    init3DCardPhysics();
}
window.renderJourney = renderJourney;

// ==========================================
// 4. GLOBAL DISCOVERY SEARCH (Ctrl+K)
// ==========================================
function setupGlobalSearchListener() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openGlobalSearch();
        }
    });
}

function openGlobalSearch() {
    const modal = document.getElementById('global-search-modal');
    const input = document.getElementById('global-search-input');
    if (modal) {
        modal.classList.remove('hidden');
        if (input) {
            input.value = '';
            input.focus();
            handleGlobalSearchInput('');
        }
    }
}
window.openGlobalSearch = openGlobalSearch;

function closeGlobalSearch() {
    const modal = document.getElementById('global-search-modal');
    if (modal) modal.classList.add('hidden');
}
window.closeGlobalSearch = closeGlobalSearch;

function handleGlobalSearchInput(query) {
    const container = document.getElementById('global-search-results');
    if (!container) return;

    const cleanQuery = (query || '').toLowerCase().trim();
    container.innerHTML = '';

    const allTopics = window.EcoData.topics || [];
    const allMissions = window.EcoData.missions || [];
    const allProjects = window.EcoData.creativeProjects || [];
    const allDecisions = window.EcoData.ecoDecisions || [];

    const matchedTopics = allTopics.filter(t => !cleanQuery || t.title.toLowerCase().includes(cleanQuery) || t.category.toLowerCase().includes(cleanQuery)).slice(0, 3);
    const matchedMissions = allMissions.filter(m => !cleanQuery || m.title.toLowerCase().includes(cleanQuery) || m.category.toLowerCase().includes(cleanQuery)).slice(0, 3);
    const matchedProjects = allProjects.filter(p => !cleanQuery || p.title.toLowerCase().includes(cleanQuery) || p.category.toLowerCase().includes(cleanQuery)).slice(0, 3);
    const matchedDecisions = allDecisions.filter(d => !cleanQuery || d.title.toLowerCase().includes(cleanQuery) || d.query.toLowerCase().includes(cleanQuery)).slice(0, 3);

    const total = matchedTopics.length + matchedMissions.length + matchedProjects.length + matchedDecisions.length;

    if (total === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No results found for "${cleanQuery}".</div>`;
        return;
    }

    // Render topics
    matchedTopics.forEach(t => {
        container.innerHTML += `
            <div class="search-result-item" onclick="closeGlobalSearch(); EcoLearning.openTopicModal('${t.id}')">
                <span class="badge badge-category" style="font-size: 0.72rem;">Topic</span>
                <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-main); margin-left: 0.5rem;">${t.title}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">${t.category}</span>
            </div>
        `;
    });

    // Render missions
    matchedMissions.forEach(m => {
        container.innerHTML += `
            <div class="search-result-item" onclick="closeGlobalSearch(); navigateTo('view-missions')">
                <span class="badge badge-water" style="font-size: 0.72rem;">Mission</span>
                <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-main); margin-left: 0.5rem;">${m.title}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">+${m.xp} XP</span>
            </div>
        `;
    });

    // Render projects
    matchedProjects.forEach(p => {
        container.innerHTML += `
            <div class="search-result-item" onclick="closeGlobalSearch(); EcoCreate.viewProjectInstructions('${p.id}')">
                <span class="badge badge-energy" style="font-size: 0.72rem;">Upcycle</span>
                <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-main); margin-left: 0.5rem;">${p.title}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">${p.cost}</span>
            </div>
        `;
    });

    // Render decisions
    matchedDecisions.forEach(d => {
        container.innerHTML += `
            <div class="search-result-item" onclick="closeGlobalSearch(); navigateTo('view-ecolens'); EcoLens.quickSearch('${d.query}')">
                <span class="badge badge-waste" style="font-size: 0.72rem;">EcoLens</span>
                <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-main); margin-left: 0.5rem;">${d.title}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">Disposal Stream</span>
            </div>
        `;
    });
}
window.handleGlobalSearchInput = handleGlobalSearchInput;

// ==========================================
// 5. SETTINGS & PERSONALIZATION ENGINE (LIGHT THEME)
// ==========================================
function renderSettings() {
    currentUser = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

    // Accent selection
    const accent = localStorage.getItem(window.EcoStorage.STORAGE_KEYS.ACCENT) || (currentUser ? currentUser.accent : 'forest') || 'forest';
    const swatches = document.querySelectorAll('.accent-swatch-card');
    swatches.forEach(swatch => {
        swatch.classList.toggle('active', swatch.dataset.accent === accent);
    });
}
window.renderSettings = renderSettings;

function applyAccent(accentName, save = true) {
    const root = document.documentElement;

    const palettes = {
        forest: { primary: '#064e3b', hover: '#047857', soft: '#ecfdf5', border: '#a7f3d0', strong: '#022c22' },
        ocean:  { primary: '#0e7490', hover: '#0891b2', soft: '#ecfeff', border: '#a5f3fc', strong: '#164e63' },
        earth:  { primary: '#92400e', hover: '#b45309', soft: '#fffbeb', border: '#fde68a', strong: '#78350f' },
        sage:   { primary: '#2d6a4f', hover: '#40916c', soft: '#f0fdf4', border: '#bbf7d0', strong: '#1b4332' },
        sunset: { primary: '#c2410c', hover: '#ea580c', soft: '#fff7ed', border: '#fed7aa', strong: '#9a3412' }
    };

    const choice = palettes[accentName] || palettes.forest;

    document.body.setAttribute('data-accent', accentName);
    root.setAttribute('data-accent', accentName);

    root.style.setProperty('--accent-primary', choice.primary);
    root.style.setProperty('--accent-hover', choice.hover);
    root.style.setProperty('--accent-soft', choice.soft);
    root.style.setProperty('--accent-border', choice.border);
    root.style.setProperty('--accent-strong', choice.strong);

    // Sync legacy variable aliases
    root.style.setProperty('--forest-green', choice.primary);
    root.style.setProperty('--forest-green-dark', choice.hover);
    root.style.setProperty('--light-green', choice.soft);
    root.style.setProperty('--light-green-border', choice.border);

    if (save) {
        localStorage.setItem(window.EcoStorage.STORAGE_KEYS.ACCENT, accentName);
        currentUser = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        if (currentUser) {
            currentUser.accent = accentName;
            window.EcoStorage.saveCurrentUser(currentUser);
        }
    }

    // Sync Settings Swatch cards
    const swatches = document.querySelectorAll('.accent-swatch-card');
    swatches.forEach(swatch => {
        swatch.classList.toggle('active', swatch.dataset.accent === accentName);
    });
}
window.applyAccent = applyAccent;

// ==========================================
// 6. SIDEBAR & MOBILE DRAWER
// ==========================================
function toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const isCollapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem(window.EcoStorage.STORAGE_KEYS.SIDEBAR, isCollapsed ? 'collapsed' : 'expanded');

    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    if (toggleIcon) {
        toggleIcon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
        if (window.lucide) window.lucide.createIcons();
    }
}
window.toggleSidebar = toggleSidebar;

function collapseSidebar(collapsed) {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    if (collapsed) sidebar.classList.add('collapsed');
    else sidebar.classList.remove('collapsed');

    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    if (toggleIcon) {
        toggleIcon.setAttribute('data-lucide', collapsed ? 'panel-left-open' : 'panel-left-close');
        if (window.lucide) window.lucide.createIcons();
    }
}

function openMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (sidebar) sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('show');
}
window.openMobileSidebar = openMobileSidebar;

function closeMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('show');
}
window.closeMobileSidebar = closeMobileSidebar;

// ==========================================
// 7. TOAST NOTIFICATIONS & MODALS
// ==========================================
function showToast(message, iconName = 'check-circle') {
    const existing = document.querySelector('.app-toast');
    if (existing && existing.remove) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.innerHTML = `<i data-lucide="${iconName}" style="width:18px; color: var(--accent-primary);"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            if (toast && toast.remove) toast.remove();
        }, 300);
    }, 3200);
}
window.showToast = showToast;

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}
window.closeModal = closeModal;

function logout() {
    window.EcoAuth.logoutUser();
}
window.logout = logout;

// ==========================================
// 8. 3D CARD PHYSICS (SUBTLE SAAS DEPTH)
// ==========================================
function init3DCardPhysics() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.card:not(.modal-content), .stat-box, .badge-card.earned, .badge-card.unlocked, .journey-stage-card, .quiz-mode-card, .iq-option, .accent-swatch-card');
    cards.forEach(card => {
        if (card.dataset.physicsInit) return;
        card.dataset.physicsInit = 'true';

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.12s ease-out, box-shadow 0.15s ease, border-color 0.2s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle, polished product-style tactile tilt (max ±3 degrees)
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
            card.style.boxShadow = 'var(--shadow-3d)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s ease, border-color 0.2s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.boxShadow = '';
        });
    });
}
window.init3DCardPhysics = init3DCardPhysics;
