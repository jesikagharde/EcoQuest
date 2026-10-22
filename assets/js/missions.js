/**
 * ECOQUEST REAL-WORLD MISSIONS CONTROLLER (assets/js/missions.js)
 * Manages verifiable household eco actions, active mission tracking,
 * category filtering, bookmarks, and status transitions with subtle SaaS depth.
 */
(function() {
    /**
     * Render the Missions Grid with filters and status-aware cards
     */
    function renderMissions() {
        const container = document.getElementById('missions-grid');
        if (!container) return;

        const categoryFilter = document.getElementById('mission-filter-category')?.value || 'all';
        const difficultyFilter = document.getElementById('mission-filter-difficulty')?.value || 'all';
        const statusFilter = document.getElementById('mission-filter-status')?.value || 'all';

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const allMissions = window.EcoData.missions || [];

        renderMissionFocusBanner(user);

        const filtered = allMissions.filter(mission => {
            const userProgress = (user.missionProgress && user.missionProgress[mission.id]) || { status: 'Available' };
            const status = userProgress.status || 'Available';

            const matchCat = (categoryFilter === 'all' || mission.category.toLowerCase() === categoryFilter.toLowerCase());
            const matchDiff = (difficultyFilter === 'all' || mission.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
            const matchStatus = (statusFilter === 'all' || status.toLowerCase() === statusFilter.toLowerCase());

            return matchCat && matchDiff && matchStatus;
        });

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i data-lucide="target" style="width: 44px; height: 44px; color: var(--text-muted); margin: 0 auto 1rem auto;"></i>
                    <h3 style="color: var(--text-main);">No missions found matching filters</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your category, difficulty, or status filter.</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        filtered.forEach(mission => {
            const userProgress = (user.missionProgress && user.missionProgress[mission.id]) || { status: 'Available' };
            const status = userProgress.status || 'Available';
            const isBookmarked = (user.bookmarks && user.bookmarks.missions && user.bookmarks.missions.includes(mission.id));

            let statusBadgeHTML = `<span class="status-badge status-available"><i data-lucide="circle" style="width:10px;"></i> Available</span>`;
            let cardStatusClass = '';

            if (status === 'In Progress') {
                statusBadgeHTML = `<span class="status-badge status-in-progress"><i data-lucide="loader" style="width:12px;"></i> In Progress</span>`;
                cardStatusClass = 'status-in-progress-card';
            } else if (status === 'Completed') {
                statusBadgeHTML = `<span class="status-badge status-completed"><i data-lucide="check" style="width:12px;"></i> Done</span>`;
                cardStatusClass = 'status-completed-card';
            } else if (status === 'Skipped') {
                statusBadgeHTML = `<span class="status-badge status-skipped"><i data-lucide="skip-forward" style="width:12px;"></i> Skipped</span>`;
                cardStatusClass = 'status-skipped-card';
            }

            let actionButtonsHTML = '';
            if (status === 'Available') {
                actionButtonsHTML = `
                    <button class="btn btn-outline btn-sm" onclick="EcoMissions.setMissionStatus('${mission.id}', 'In Progress')">
                        <i data-lucide="play"></i> Start Mission
                    </button>
                `;
            } else if (status === 'In Progress') {
                actionButtonsHTML = `
                    <button class="btn btn-text btn-sm" style="color: var(--text-muted);" onclick="EcoMissions.setMissionStatus('${mission.id}', 'Skipped')">
                        Skip
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="EcoMissions.completeMission('${mission.id}', ${mission.xp})">
                        <i data-lucide="check-circle"></i> Continue
                    </button>
                `;
            } else if (status === 'Completed') {
                actionButtonsHTML = `
                    <div style="text-align: right;">
                        <span style="color: var(--accent-primary); font-weight: 700; font-size: 0.88rem; display: block;">✓ Completed</span>
                        <span style="color: var(--text-muted); font-size: 0.78rem;">+${mission.xp} XP Earned</span>
                    </div>
                `;
            } else if (status === 'Skipped') {
                actionButtonsHTML = `
                    <button class="btn btn-outline btn-sm" onclick="EcoMissions.setMissionStatus('${mission.id}', 'In Progress')">
                        <i data-lucide="rotate-ccw"></i> Restart Mission
                    </button>
                `;
            }

            container.innerHTML += `
                <div class="card mission-card ${cardStatusClass}">
                    <div class="mission-header">
                        <div class="mission-header-left">
                            <span class="badge badge-category">${mission.category}</span>
                            <span class="badge badge-${mission.difficulty.toLowerCase()}">${mission.difficulty}</span>
                            <span class="badge badge-energy" style="font-size: 0.74rem;">+${mission.xp} XP</span>
                        </div>
                        <div class="mission-header-actions">
                            ${statusBadgeHTML}
                            <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('missions', '${mission.id}')" title="Bookmark Mission">
                                <i data-lucide="bookmark" style="${isBookmarked ? 'color: var(--accent-primary); fill: var(--accent-primary);' : 'color: var(--text-muted);'} width:16px; height:16px;"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="topic-card-title">${mission.title}</h3>
                    <p class="topic-card-desc">${mission.desc}</p>
                    
                    <div class="mission-impact-box">
                        <strong style="color: var(--text-main); display: block; margin-bottom: 0.15rem;">
                            <i data-lucide="sparkles" style="width:13px; vertical-align:middle; color: var(--accent-primary);"></i> Real Impact:
                        </strong>
                        ${mission.impact}
                    </div>

                    <div class="mission-footer">
                        <div style="display: flex; gap: 0.75rem; font-size: 0.82rem; color: var(--text-muted);">
                            <span><i data-lucide="clock" style="width:13px; vertical-align:middle;"></i> ${mission.time}</span>
                            <span><i data-lucide="map-pin" style="width:13px; vertical-align:middle;"></i> ${mission.context}</span>
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            ${actionButtonsHTML}
                        </div>
                    </div>
                </div>
            `;
        });

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Render Top Recommendation Focus Banner based on EcoIQ weaknesses
     */
    function renderMissionFocusBanner(user) {
        const banner = document.getElementById('mission-focus-banner');
        if (!banner) return;

        if (user.ecoIQDetails && user.ecoIQDetails.weakestCategory) {
            const weakCat = user.ecoIQDetails.weakestCategory.split(' ')[0];
            const allMissions = window.EcoData.missions || [];
            const suggested = allMissions.find(m => m.category.toLowerCase().includes(weakCat.toLowerCase()) && (!user.missionProgress[m.id] || user.missionProgress[m.id].status !== 'Completed'));

            if (suggested) {
                banner.classList.remove('hidden');
                banner.innerHTML = `
                    <div class="card" style="background: var(--accent-soft); border: 1.5px solid var(--accent-border); padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <span class="badge badge-category" style="margin-bottom: 0.35rem;">
                                <i data-lucide="sparkles" style="width:12px;"></i> Tailored Recommendation from EcoIQ
                            </span>
                            <h4 style="font-size: 1.1rem; color: var(--accent-primary); margin: 0.2rem 0;">Target Weakness: ${user.ecoIQDetails.weakestCategory}</h4>
                            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">Try completing: <strong>${suggested.title}</strong> to strengthen your circular habits.</p>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="EcoMissions.setMissionStatus('${suggested.id}', 'In Progress')">
                            <i data-lucide="play"></i> Start Suggested Mission
                        </button>
                    </div>
                `;
                return;
            }
        }
        banner.classList.add('hidden');
    }

    /**
     * Update mission status (Available, In Progress, Skipped)
     */
    function setMissionStatus(missionId, newStatus) {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        if (!user.missionProgress) user.missionProgress = {};
        if (!user.missionProgress[missionId]) user.missionProgress[missionId] = {};

        user.missionProgress[missionId].status = newStatus;
        if (newStatus === 'In Progress') {
            user.missionProgress[missionId].startedAt = new Date().toISOString();
        }

        window.EcoStorage.saveCurrentUser(user);
        renderMissions();
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderProgressAnalytics) window.renderProgressAnalytics();
        if (window.renderProfile) window.renderProfile();

        window.showToast(`Mission marked: ${newStatus}`, 'target');
    }

    /**
     * Complete a mission and award XP once
     */
    function completeMission(missionId, xpReward) {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        if (!user.missionProgress) user.missionProgress = {};
        const currentStatus = user.missionProgress[missionId]?.status;

        if (currentStatus === 'Completed') {
            window.showToast('Mission is already completed.', 'info');
            return;
        }

        if (!user.missionProgress[missionId]) {
            user.missionProgress[missionId] = {};
        }

        user.missionProgress[missionId].status = 'Completed';
        user.missionProgress[missionId].completedAt = new Date().toLocaleDateString();

        // Increment XP safely
        user.xp = (user.xp || 0) + xpReward;

        window.EcoStorage.saveCurrentUser(user);
        window.showToast(`Mission Completed! +${xpReward} EcoXP Awarded`, 'award');

        renderMissions();
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderProgressAnalytics) window.renderProgressAnalytics();
        if (window.renderProfile) window.renderProfile();
    }

    // Expose API
    window.EcoMissions = {
        renderMissions,
        setMissionStatus,
        completeMission
    };

    // Backward-compatibility aliases
    window.renderMissions = renderMissions;
    window.filterMissions = renderMissions;
    window.setMissionStatus = setMissionStatus;
    window.completeMission = completeMission;
})();
