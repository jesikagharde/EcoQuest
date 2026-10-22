/**
 * ECOQUEST PROGRESS ANALYTICS & MASTERY MODULE (assets/js/progress.js)
 * Calculates category domain mastery, milestone progression, and badges.
 */
(function() {
    /**
     * Render the My Progress View
     */
    function renderProgressAnalytics() {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

        // 1. Top Stat Cards
        const xpEl = document.getElementById('prog-xp');
        if (xpEl) xpEl.textContent = `${user.xp || 0} XP`;

        const allTopics = window.EcoData.topics || [];
        const topicsDone = Object.values(user.topicProgress || {}).filter(t => t.status === 'Completed').length;
        const topEl = document.getElementById('prog-topics');
        if (topEl) topEl.textContent = `${topicsDone} / ${allTopics.length}`;

        const missionsDone = Object.values(user.missionProgress || {}).filter(m => m.status === 'Completed').length;
        const misEl = document.getElementById('prog-missions');
        if (misEl) misEl.textContent = `${missionsDone} / ${(window.EcoData.missions || []).length}`;

        const projDone = Object.values(user.creativeProgress || {}).filter(p => p.status === 'Completed').length;
        const prjEl = document.getElementById('prog-projects');
        if (prjEl) prjEl.textContent = `${projDone}`;

        const quizCount = (user.assessmentHistory || []).length;
        const qzEl = document.getElementById('prog-quizzes');
        if (qzEl) qzEl.textContent = `${quizCount}`;

        // 2. Category Mastery Progression
        renderCategoryMastery(user);

        // 3. Badges Grid
        renderBadgesSection(user);

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Calculate and render percentage mastery across core environmental domains
     */
    function renderCategoryMastery(user) {
        const container = document.getElementById('prog-category-bars');
        if (!container) return;

        const categories = [
            { name: 'Waste & Circularity', key: 'Waste', icon: 'trash-2' },
            { name: 'Water Conservation', key: 'Water', icon: 'droplet' },
            { name: 'Energy & Climate', key: 'Energy', icon: 'zap' },
            { name: 'Food & Organic Living', key: 'Food', icon: 'utensils' },
            { name: 'E-Waste & Technology', key: 'E-Waste', icon: 'cpu' },
            { name: 'Sustainable Fashion', key: 'Fashion', icon: 'shirt' },
            { name: 'Biodiversity & Nature', key: 'Biodiversity', icon: 'sprout' },
            { name: 'Plastics & Oceans', key: 'Plastic', icon: 'waves' }
        ];

        container.innerHTML = '';

        const allTopics = window.EcoData.topics || [];
        const allMissions = window.EcoData.missions || [];

        categories.forEach(cat => {
            const catTopics = allTopics.filter(t => t.category.includes(cat.key));
            const catMissions = allMissions.filter(m => m.category.includes(cat.key));

            let totalItems = catTopics.length + catMissions.length;
            if (totalItems === 0) totalItems = 1;

            let completedItems = 0;
            catTopics.forEach(t => {
                if (user.topicProgress && user.topicProgress[t.id]?.status === 'Completed') completedItems++;
            });
            catMissions.forEach(m => {
                if (user.missionProgress && user.missionProgress[m.id]?.status === 'Completed') completedItems++;
            });

            // If user has assessment score in this category, blend it in
            let scoreBoost = 0;
            if (user.ecoIQCategoryScores && user.ecoIQCategoryScores[cat.name]) {
                scoreBoost = user.ecoIQCategoryScores[cat.name] * 0.3; // 30% weight from assessment
            }

            const rawPct = Math.round((completedItems / totalItems) * 70 + scoreBoost);
            const finalPct = Math.min(100, Math.max(0, rawPct));

            container.innerHTML += `
                <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 0.85rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
                            <i data-lucide="${cat.icon}" style="width: 16px; color: var(--forest-green);"></i> ${cat.name}
                        </span>
                        <span style="font-weight: 800; font-size: 0.95rem; color: var(--forest-green);">${finalPct}%</span>
                    </div>
                    <div class="progress-bar-container" style="height: 8px; background: var(--border-color);">
                        <div class="progress-fill" style="width: ${finalPct}%; background: var(--forest-green);"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 0.35rem; font-size: 0.78rem; color: var(--text-muted);">
                        <span>${completedItems} of ${totalItems} modules & missions completed</span>
                        <span>${finalPct >= 80 ? '🌟 Mastery' : finalPct >= 40 ? '🌱 Growing' : '📖 Learning'}</span>
                    </div>
                </div>
            `;
        });
    }

    /**
     * Render Badges Grid in Progress section
     */
    function renderBadgesSection(user) {
        const container = document.getElementById('prog-badges-grid');
        if (!container) return;

        const allBadges = window.EcoData.badges || [];
        container.innerHTML = '';

        allBadges.forEach(badge => {
            const isUnlocked = badge.checkUnlock ? badge.checkUnlock(user, window.EcoData) : false;

            container.innerHTML += `
                <div class="badge-card ${isUnlocked ? 'earned unlocked' : 'locked unearned'}" title="${badge.desc}">
                    <div class="badge-icon">
                        <span style="font-size: 1.8rem; line-height: 1;">${badge.icon || '🌱'}</span>
                    </div>
                    <h5 style="font-size: 0.92rem; margin-bottom: 0.25rem; color: var(--text-main); font-weight: 700;">${badge.title}</h5>
                    <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${badge.desc}</p>
                    <span style="display: inline-block; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 700; color: ${isUnlocked ? 'var(--accent-primary)' : 'var(--text-muted)'};">
                        ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                    </span>
                </div>
            `;
        });
    }

    // Expose API
    window.EcoProgress = {
        renderProgressAnalytics
    };

    // Backward-compatibility aliases
    window.renderProgressAnalytics = renderProgressAnalytics;
})();
