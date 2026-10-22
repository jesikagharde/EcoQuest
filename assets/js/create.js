/**
 * ECOQUEST CREATE WITH WHAT YOU HAVE MODULE (assets/js/create.js)
 * Implements multi-material selection, mathematical scoring recommendation engine,
 * step-by-step DIY instruction modal guides, and completion tracking.
 */
(function() {
    let selectedMaterialIds = ['mat_cardboard'];
    let currentModalProjectId = null;

    /**
     * Initialize Materials Selector UI
     */
    function initMaterialsSelector() {
        const container = document.getElementById('materials-chips');
        if (!container) return;

        const allMaterials = window.EcoData.materials || [];
        container.innerHTML = '';

        allMaterials.forEach(mat => {
            const isSelected = selectedMaterialIds.includes(mat.id);
            const chip = document.createElement('span');
            chip.className = `material-chip ${isSelected ? 'selected' : ''}`;
            chip.innerHTML = `<i data-lucide="${mat.icon || 'package'}" style="width:14px;"></i> ${mat.name}`;
            chip.onclick = () => toggleMaterialSelection(mat.id);
            container.appendChild(chip);
        });

        if (window.lucide) window.lucide.createIcons();
        filterCreativeProjects();
    }

    /**
     * Toggle Material Selection
     */
    function toggleMaterialSelection(matId) {
        const idx = selectedMaterialIds.indexOf(matId);
        if (idx > -1) {
            if (selectedMaterialIds.length > 1) {
                selectedMaterialIds.splice(idx, 1);
            } else {
                window.showToast('Please keep at least one material selected.', 'info');
                return;
            }
        } else {
            selectedMaterialIds.push(matId);
        }

        initMaterialsSelector();
    }

    /**
     * Multi-Criteria Recommendation Scoring Engine
     */
    function filterCreativeProjects() {
        const container = document.getElementById('creative-projects-grid');
        if (!container) return;

        const timeFilterEl = document.getElementById('project-filter-time');
        const diffFilterEl = document.getElementById('project-filter-diff');
        const catFilterEl = document.getElementById('project-filter-category');

        const timeFilter = timeFilterEl ? timeFilterEl.value : 'all';
        const diffFilter = diffFilterEl ? diffFilterEl.value : 'all';
        const catFilter = catFilterEl ? catFilterEl.value : 'all';

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const allProjects = window.EcoData.creativeProjects || [];

        // Score each project using the multi-variable algorithm
        const scored = allProjects.map(proj => {
            let score = 0;
            let matchCount = 0;

            // 1. Material Match (+3 for each matching material)
            proj.materials.forEach(m => {
                if (selectedMaterialIds.includes(m)) {
                    score += 3;
                    matchCount++;
                }
            });

            // 2. Multi-material bonus (+2 if project utilizes multiple chosen items)
            if (matchCount > 1) score += 2;

            // 3. User Filter Bonuses
            if (diffFilter !== 'all' && proj.difficulty.toLowerCase() === diffFilter.toLowerCase()) score += 2;
            if (catFilter !== 'all' && proj.category.toLowerCase().includes(catFilter.toLowerCase())) score += 2;
            if (timeFilter !== 'all') {
                const projMins = parseInt(proj.time) || 15;
                if (timeFilter === 'quick' && projMins <= 15) score += 2;
                if (timeFilter === 'medium' && projMins > 15 && projMins <= 30) score += 2;
                if (timeFilter === 'long' && projMins > 30) score += 2;
            }

            return { proj, score, matchCount };
        });

        // Filter out zero-material matches when specific materials are picked, then sort by highest score
        let results = scored
            .filter(item => item.matchCount > 0 || selectedMaterialIds.length === 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.proj);

        // Fallback to all if no exact material match
        if (results.length === 0) {
            results = [...allProjects];
        }

        container.innerHTML = '';

        results.forEach(proj => {
            const isCompleted = (user.creativeProgress && user.creativeProgress[proj.id]?.status === 'Completed');
            const isSaved = (user.savedProjects && user.savedProjects.includes(proj.id));

            const matTags = proj.materials.map(mId => {
                const m = (window.EcoData.materials || []).find(x => x.id === mId);
                const isHighlighted = selectedMaterialIds.includes(mId);
                return `<span style="font-size: 0.76rem; background: ${isHighlighted ? 'var(--light-green)' : 'var(--warm-cream)'}; border: 1px solid ${isHighlighted ? 'var(--forest-green)' : 'var(--border-color)'}; color: ${isHighlighted ? 'var(--forest-green)' : 'var(--text-main)'}; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">${m ? m.name : mId}</span>`;
            }).join(' ');

            container.innerHTML += `
                <div class="card project-card">
                    <div class="topic-card-header">
                        <span class="badge badge-category">${proj.category}</span>
                        <button class="btn btn-text bookmark-btn" onclick="EcoBookmarks.toggleBookmark('projects', '${proj.id}')" title="Save Project Bookmark">
                            <i data-lucide="bookmark" style="${isSaved ? 'color: var(--accent-primary); fill: var(--accent-primary);' : 'color: var(--text-muted);'} width: 16px; height: 16px;"></i>
                        </button>
                    </div>

                    <h3 class="topic-card-title">${proj.title}</h3>
                    <p class="topic-card-desc">${proj.desc}</p>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
                        ${matTags}
                    </div>

                    <div class="project-meta">
                        <span><i data-lucide="clock" style="width:13px; vertical-align:middle;"></i> ${proj.time}</span>
                        <span><i data-lucide="banknote" style="width:13px; vertical-align:middle;"></i> ${proj.cost}</span>
                        <span><i data-lucide="bar-chart-2" style="width:13px; vertical-align:middle;"></i> ${proj.difficulty}</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.85rem; margin-top: auto;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: ${isCompleted ? 'var(--forest-green)' : 'var(--earth-brown)'};">
                            ${isCompleted ? '✓ Completed' : `+${proj.xpReward} XP`}
                        </span>
                        <button class="btn btn-outline btn-sm" onclick="EcoCreate.viewProjectInstructions('${proj.id}')">
                            <i data-lucide="eye"></i> Instructions
                        </button>
                    </div>
                </div>
            `;
        });

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Open Project Instructions Modal
     */
    function viewProjectInstructions(projectId) {
        const allProjects = window.EcoData.creativeProjects || [];
        const proj = allProjects.find(p => p.id === projectId);
        if (!proj) return;

        currentModalProjectId = projectId;
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const isSaved = (user.savedProjects && user.savedProjects.includes(projectId));
        const isCompleted = (user.creativeProgress && user.creativeProgress[projectId]?.status === 'Completed');

        const modal = document.getElementById('project-modal');
        if (!modal) return;

        document.getElementById('modal-project-title').textContent = proj.title;
        document.getElementById('modal-project-category').textContent = proj.category;
        document.getElementById('modal-project-meta').textContent = `${proj.time} • ${proj.cost} • ${proj.difficulty}`;
        document.getElementById('modal-project-safety').textContent = proj.safetyNote || 'Exercise care with cutting tools and hot surfaces.';

        // Materials List
        const matContainer = document.getElementById('modal-project-materials');
        if (matContainer) {
            matContainer.innerHTML = '';
            proj.materials.forEach(matId => {
                const mat = (window.EcoData.materials || []).find(m => m.id === matId);
                if (mat) {
                    matContainer.innerHTML += `
                        <span style="font-size: 0.85rem; font-weight: 600; background: var(--warm-cream); border: 1px solid var(--border-color); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 0.4rem;">
                            <i data-lucide="${mat.icon || 'package'}" style="width:15px"></i> ${mat.name}
                        </span>
                    `;
                }
            });
        }

        // Steps List
        const stepsList = document.getElementById('modal-project-steps');
        if (stepsList) {
            stepsList.innerHTML = proj.instructions.map(step => `<li>${step}</li>`).join('');
        }

        // Action Buttons
        const saveBtn = document.getElementById('modal-btn-save-project');
        if (saveBtn) {
            saveBtn.innerHTML = `<i data-lucide="bookmark"></i> ${isSaved ? 'Unsave Project' : 'Save Project'}`;
        }

        const completeBtn = document.getElementById('modal-btn-complete-project');
        if (completeBtn) {
            if (isCompleted) {
                completeBtn.disabled = true;
                completeBtn.className = 'btn btn-secondary';
                completeBtn.innerHTML = `✓ Project Completed (+${proj.xpReward} XP)`;
            } else {
                completeBtn.disabled = false;
                completeBtn.className = 'btn btn-primary';
                completeBtn.innerHTML = `<i data-lucide="check-circle"></i> Mark Completed (+${proj.xpReward} XP)`;
            }
        }

        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    /**
     * Mark Project as Completed & Award XP once
     */
    function completeCurrentProject() {
        if (!currentModalProjectId) return;
        const allProjects = window.EcoData.creativeProjects || [];
        const proj = allProjects.find(p => p.id === currentModalProjectId);
        if (!proj) return;

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const wasCompleted = (user.creativeProgress && user.creativeProgress[currentModalProjectId]?.status === 'Completed');

        if (wasCompleted) {
            window.showToast('Project is already marked completed.', 'info');
            return;
        }

        user.creativeProgress[currentModalProjectId] = {
            status: 'Completed',
            completedAt: new Date().toLocaleDateString()
        };

        user.xp = (user.xp || 0) + proj.xpReward;
        window.EcoStorage.saveCurrentUser(user);

        window.showToast(`Upcycle Project Completed! +${proj.xpReward} EcoXP Earned`, 'award');
        
        const modal = document.getElementById('project-modal');
        if (modal) modal.classList.add('hidden');

        filterCreativeProjects();
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderProgressAnalytics) window.renderProgressAnalytics();
        if (window.renderProfile) window.renderProfile();
    }

    /**
     * Toggle Save Project from Modal
     */
    function toggleSaveCurrentProject() {
        if (!currentModalProjectId) return;
        EcoBookmarks.toggleBookmark('projects', currentModalProjectId);
        viewProjectInstructions(currentModalProjectId);
    }

    // Expose API
    window.EcoCreate = {
        initMaterialsSelector,
        toggleMaterialSelection,
        filterCreativeProjects,
        viewProjectInstructions,
        completeCurrentProject,
        toggleSaveCurrentProject
    };

    // Backward-compatibility aliases
    window.initMaterialsSelector = initMaterialsSelector;
    window.toggleMaterial = toggleMaterialSelection;
    window.filterCreativeProjects = filterCreativeProjects;
    window.viewProjectInstructions = viewProjectInstructions;
    window.completeCurrentProject = completeCurrentProject;
    window.toggleSaveCurrentProject = toggleSaveCurrentProject;
})();
