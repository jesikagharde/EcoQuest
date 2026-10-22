/**
 * ECOQUEST UNIFIED BOOKMARKS MODULE (assets/js/bookmarks.js)
 * Manages user bookmarks across Topics, Missions, Creative Projects, and EcoLens entries.
 */
(function() {
    let activeBookmarkFilter = 'all';

    function normalizeType(type) {
        if (!type) return 'topics';
        if (type === 'topic') return 'topics';
        if (type === 'mission') return 'missions';
        if (type === 'project') return 'projects';
        return type;
    }

    /**
     * Toggle bookmark for any item type ('topics', 'missions', 'projects', 'ecolens')
     */
    function toggleBookmark(type, id) {
        const normType = normalizeType(type);
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        user.bookmarks = user.bookmarks || { topics: [], missions: [], projects: [], ecolens: [] };
        user.bookmarks[normType] = user.bookmarks[normType] || [];

        const idx = user.bookmarks[normType].indexOf(id);
        if (idx > -1) {
            user.bookmarks[normType].splice(idx, 1);
            window.showToast('Item removed from bookmarks', 'bookmark');
        } else {
            user.bookmarks[normType].push(id);
            window.showToast('Item saved to your bookmarks!', 'bookmark');
        }

        // Keep savedProjects synchronized for backward compatibility
        if (normType === 'projects') {
            user.savedProjects = [...user.bookmarks.projects];
        }

        window.EcoStorage.saveCurrentUser(user);

        // Refresh views
        renderBookmarks();
        if (window.renderTopics) window.renderTopics();
        if (window.renderMissions) window.renderMissions();
        if (window.filterCreativeProjects) window.filterCreativeProjects();
        if (window.searchEcoLens) window.searchEcoLens();
        if (window.renderProfile) window.renderProfile();
    }

    /**
     * Filter bookmarks by category tab
     */
    function filterBookmarksByTab(tab) {
        activeBookmarkFilter = tab;
        const tabs = document.querySelectorAll('.bookmark-tab-btn');
        tabs.forEach(t => {
            if (t.dataset.tab === tab) t.classList.add('active');
            else t.classList.remove('active');
        });
        renderBookmarks();
    }

    /**
     * Render the Bookmarks Page
     */
    function renderBookmarks() {
        const container = document.getElementById('bookmarks-grid');
        if (!container) return;

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const b = user.bookmarks || { topics: [], missions: [], projects: [], ecolens: [] };

        const allTopics = window.EcoData.topics || [];
        const allMissions = window.EcoData.missions || [];
        const allProjects = window.EcoData.creativeProjects || [];
        const allDecisions = window.EcoData.ecoDecisions || [];

        const bookmarkedTopics = allTopics.filter(t => b.topics && b.topics.includes(t.id));
        const bookmarkedMissions = allMissions.filter(m => b.missions && b.missions.includes(m.id));
        const bookmarkedProjects = allProjects.filter(p => (b.projects && b.projects.includes(p.id)) || (user.savedProjects && user.savedProjects.includes(p.id)));
        const bookmarkedDecisions = allDecisions.filter(d => b.ecolens && b.ecolens.includes(d.id));

        let itemsToRender = [];

        if (activeBookmarkFilter === 'all' || activeBookmarkFilter === 'topics') {
            bookmarkedTopics.forEach(t => itemsToRender.push({ type: 'topic', data: t }));
        }
        if (activeBookmarkFilter === 'all' || activeBookmarkFilter === 'missions') {
            bookmarkedMissions.forEach(m => itemsToRender.push({ type: 'mission', data: m }));
        }
        if (activeBookmarkFilter === 'all' || activeBookmarkFilter === 'projects') {
            bookmarkedProjects.forEach(p => itemsToRender.push({ type: 'project', data: p }));
        }
        if (activeBookmarkFilter === 'all' || activeBookmarkFilter === 'ecolens') {
            bookmarkedDecisions.forEach(d => itemsToRender.push({ type: 'ecolens', data: d }));
        }

        container.innerHTML = '';

        if (itemsToRender.length === 0) {
            container.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 2rem;">
                    <i data-lucide="bookmark" style="width: 52px; height: 52px; color: var(--border-color); margin: 0 auto 1.25rem auto;"></i>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.35rem;">No Bookmarks in this Category</h3>
                    <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.75rem auto; line-height: 1.6;">
                        Click the bookmark icon on any Learning Topic, Mission, DIY Project, or EcoLens guide to collect them here.
                    </p>
                    <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-outline btn-sm" onclick="navigateTo('view-learn')"><i data-lucide="book-open"></i> Browse Lessons</button>
                        <button class="btn btn-outline btn-sm" onclick="navigateTo('view-create')"><i data-lucide="scissors"></i> Browse Upcycling</button>
                        <button class="btn btn-primary btn-sm" onclick="navigateTo('view-missions')"><i data-lucide="target"></i> Eco Missions</button>
                    </div>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        itemsToRender.forEach(item => {
            if (item.type === 'topic') {
                const t = item.data;
                const isCompleted = (user.topicProgress && user.topicProgress[t.id]?.status === 'Completed');
                container.innerHTML += `
                    <div class="card" style="border-top: 4px solid var(--forest-green); display: flex; flex-direction: column;">
                        <div class="topic-card-header">
                            <span class="badge badge-category">Topic • ${t.category}</span>
                            <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('topics', '${t.id}')" title="Saved to Bookmarks (Click to remove)">
                                <i data-lucide="bookmark" style="color: var(--accent-primary); fill: var(--accent-primary); width:16px; height:16px;"></i>
                            </button>
                        </div>
                        <h4 class="topic-card-title">${t.title}</h4>
                        <p class="topic-card-desc">${t.shortDescription}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: auto;">
                            <span style="font-size: 0.82rem; color: var(--forest-green); font-weight: 700;">+${t.xpReward} XP</span>
                            <button class="btn btn-outline btn-sm" onclick="EcoLearning.openTopicModal('${t.id}')">
                                <i data-lucide="book-open"></i> ${isCompleted ? 'Review' : 'Open Lesson'}
                            </button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'mission') {
                const m = item.data;
                const isDone = (user.missionProgress && user.missionProgress[m.id]?.status === 'Completed');
                container.innerHTML += `
                    <div class="card" style="border-top: 4px solid #0284c7; display: flex; flex-direction: column;">
                        <div class="topic-card-header">
                            <span class="badge badge-water">Mission • ${m.category}</span>
                            <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('missions', '${m.id}')" title="Saved to Bookmarks (Click to remove)">
                                <i data-lucide="bookmark" style="color: var(--accent-primary); fill: var(--accent-primary); width:16px; height:16px;"></i>
                            </button>
                        </div>
                        <h4 class="topic-card-title">${m.title}</h4>
                        <p class="topic-card-desc">${m.desc}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: auto;">
                            <span style="font-size: 0.82rem; color: var(--forest-green); font-weight: 700;">${isDone ? '✓ Completed' : `+${m.xp} XP`}</span>
                            <button class="btn btn-outline btn-sm" onclick="navigateTo('view-missions')">
                                <i data-lucide="play"></i> Go to Missions
                            </button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'project') {
                const p = item.data;
                const isDone = (user.creativeProgress && user.creativeProgress[p.id]?.status === 'Completed');
                container.innerHTML += `
                    <div class="card" style="border-top: 4px solid var(--earth-brown); display: flex; flex-direction: column;">
                        <div class="topic-card-header">
                            <span class="badge badge-energy">Upcycle • ${p.category}</span>
                            <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('projects', '${p.id}')" title="Saved to Bookmarks (Click to remove)">
                                <i data-lucide="bookmark" style="color: var(--accent-primary); fill: var(--accent-primary); width:16px; height:16px;"></i>
                            </button>
                        </div>
                        <h4 class="topic-card-title">${p.title}</h4>
                        <p class="topic-card-desc">${p.desc}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: auto;">
                            <span style="font-size: 0.82rem; color: var(--forest-green); font-weight: 700;">${isDone ? '✓ Completed' : `+${p.xpReward} XP`}</span>
                            <button class="btn btn-outline btn-sm" onclick="EcoCreate.viewProjectInstructions('${p.id}')">
                                <i data-lucide="eye"></i> Guide
                            </button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'ecolens') {
                const d = item.data;
                container.innerHTML += `
                    <div class="card" style="border-top: 4px solid var(--forest-green); display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <span class="badge badge-waste">EcoLens • ${d.topic}</span>
                            <button class="btn btn-text" style="padding: 0.25rem;" onclick="EcoBookmarks.toggleBookmark('ecolens', '${d.id}')" title="Saved to Bookmarks (Click to remove)">
                                <i data-lucide="bookmark" style="color: var(--accent-primary); fill: var(--accent-primary); width:18px;"></i>
                            </button>
                        </div>
                        <h4 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.4rem;">${d.title}</h4>
                        <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.55; margin-bottom: 1rem; flex: 1;">${d.recommendation}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: auto;">
                            <span style="font-size: 0.82rem; color: var(--forest-green); font-weight: 700;">Verified Stream</span>
                            <button class="btn btn-outline btn-sm" onclick="navigateTo('view-ecolens'); EcoLens.quickSearch('${d.query}')">
                                <i data-lucide="search"></i> View Guide
                            </button>
                        </div>
                    </div>
                `;
            }
        });

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    function isBookmarked(type, id) {
        const normType = normalizeType(type);
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        if (!user.bookmarks) return false;
        const group = user.bookmarks[normType] || [];
        return group.includes(id);
    }

    // Expose API
    window.EcoBookmarks = {
        toggleBookmark,
        filterBookmarksByTab,
        renderBookmarks,
        isBookmarked
    };

    // Backward-compatibility aliases
    window.renderBookmarks = renderBookmarks;
    window.toggleSaveProject = (id) => toggleBookmark('projects', id);
})();
