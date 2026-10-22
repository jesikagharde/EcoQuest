/**
 * ECOQUEST USER PROFILE & IMPACT DASHBOARD (assets/js/profile.js)
 * Implements real calculated metrics, verified environmental impacts,
 * level advancement progression, achievement showcases, and polished profile editing.
 */
(function() {
    const LEVELS = [
        { level: 1, title: 'Seedling', minXp: 0, maxXp: 150 },
        { level: 2, title: 'Sprout', minXp: 150, maxXp: 350 },
        { level: 3, title: 'Sapling', minXp: 350, maxXp: 650 },
        { level: 4, title: 'Eco Explorer', minXp: 650, maxXp: 1000 },
        { level: 5, title: 'Planet Protector', minXp: 1000, maxXp: 2000 }
    ];

    /**
     * Render the Full Profile Page
     */
    function renderProfile() {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

        // 1. Profile Header Elements
        const avatarInitial = user.avatarInitial || (user.name ? user.name.charAt(0).toUpperCase() : '');
        
        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) avatarEl.textContent = avatarInitial;

        const editAvatarPreview = document.getElementById('edit-avatar-preview');
        if (editAvatarPreview) editAvatarPreview.textContent = avatarInitial;

        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = user.name || '';

        const emailEl = document.getElementById('profile-email');
        if (emailEl) emailEl.textContent = user.email || '';

        const bioEl = document.getElementById('profile-bio');
        if (bioEl) bioEl.textContent = user.bio || '';

        // 2. Level & XP Progress
        const userXp = user.xp || 0;
        let currentLvl = LEVELS[0];
        let nextLvl = LEVELS[1];

        for (let i = 0; i < LEVELS.length; i++) {
            if (userXp >= LEVELS[i].minXp) {
                currentLvl = LEVELS[i];
                nextLvl = LEVELS[i + 1] || { minXp: 2000, maxXp: 5000, title: 'Eco Legend' };
            }
        }

        const levelBadgeEl = document.getElementById('profile-level-badge');
        if (levelBadgeEl) {
            levelBadgeEl.textContent = `Level ${currentLvl.level} • ${currentLvl.title}`;
        }

        const xpRange = Math.max(1, nextLvl.minXp - currentLvl.minXp);
        const xpInLevel = userXp - currentLvl.minXp;
        const progressPct = Math.min(100, Math.max(0, Math.round((xpInLevel / xpRange) * 100)));

        const xpTextEl = document.getElementById('profile-xp-text');
        if (xpTextEl) {
            xpTextEl.textContent = `${userXp} XP (${userXp} / ${nextLvl.minXp} XP to Level ${currentLvl.level + 1})`;
        }

        const xpBarEl = document.getElementById('profile-xp-bar');
        if (xpBarEl) {
            xpBarEl.style.width = `${progressPct}%`;
        }

        // 3. Calculated Real Impact Statistics
        const allMissions = window.EcoData.missions || [];
        let waterSavedLitres = 0;
        let energySavedKwh = 0;
        let wasteDivertedKg = 0;

        Object.keys(user.missionProgress || {}).forEach(mId => {
            if (user.missionProgress[mId].status === 'Completed') {
                const mission = allMissions.find(m => m.id === mId);
                if (mission) {
                    if (mission.impactCategory === 'water') waterSavedLitres += (mission.impactValue || 40);
                    if (mission.impactCategory === 'energy') energySavedKwh += (mission.impactValue || 10);
                    if (mission.impactCategory === 'waste') wasteDivertedKg += (mission.impactValue || 0.5);
                    if (mission.impactCategory === 'carbon') energySavedKwh += (mission.impactValue * 2 || 8);
                }
            }
        });

        const impWater = document.getElementById('prof-imp-water');
        if (impWater) impWater.textContent = `${waterSavedLitres} L`;

        const impEnergy = document.getElementById('prof-imp-energy');
        if (impEnergy) impEnergy.textContent = `${energySavedKwh} kWh`;

        const impWaste = document.getElementById('prof-imp-waste');
        if (impWaste) impWaste.textContent = `${wasteDivertedKg.toFixed(1)} kg`;

        // 4. Badges Showcase (Evaluate unlocks in real-time)
        renderProfileBadges(user);

        // 5. Pre-fill Edit Profile Form inputs
        const editName = document.getElementById('edit-profile-name');
        if (editName) editName.value = user.name || '';
        
        const editEmail = document.getElementById('edit-profile-email');
        if (editEmail) editEmail.value = user.email || '';

        const editBio = document.getElementById('edit-profile-bio');
        if (editBio) {
            editBio.value = user.bio || '';
            updateBioCharCount();
        }

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Live Character Counter for Profile Bio
     */
    function updateBioCharCount() {
        const bioInput = document.getElementById('edit-profile-bio');
        const countEl = document.getElementById('bio-char-count');
        if (!bioInput || !countEl) return;

        const currentLen = bioInput.value.length;
        countEl.textContent = currentLen;
        if (currentLen > 160) {
            countEl.style.color = '#ef4444';
            countEl.style.fontWeight = '700';
        } else {
            countEl.style.color = 'var(--text-muted)';
            countEl.style.fontWeight = 'normal';
        }
    }

    /**
     * Render Badges with dynamic lock/unlock state
     */
    function renderProfileBadges(user) {
        const container = document.getElementById('profile-badges-grid');
        if (!container) return;

        const allBadges = window.EcoData.badges || [];
        container.innerHTML = '';

        allBadges.forEach(badge => {
            const isUnlocked = badge.checkUnlock ? badge.checkUnlock(user, window.EcoData) : false;

            container.innerHTML += `
                <div class="badge-card ${isUnlocked ? 'earned unlocked' : 'locked unearned'}" title="${badge.desc}">
                    <div class="badge-icon-wrap">
                        <span style="font-size: 1.6rem; line-height: 1;">${badge.icon || '🌱'}</span>
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

    /**
     * Cancel Profile Edits without page reload
     */
    function cancelProfileEdit() {
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        const editName = document.getElementById('edit-profile-name');
        if (editName) editName.value = user.name || '';
        const editBio = document.getElementById('edit-profile-bio');
        if (editBio) editBio.value = user.bio || '';
        updateBioCharCount();
        window.showToast('Edit cancelled. Reverted to saved details.', 'info');
    }

    /**
     * Save Profile Edits with immediate synchronous UI updates
     */
    function saveProfileChanges(e) {
        if (e) e.preventDefault();
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

        const nameInput = document.getElementById('edit-profile-name');
        const bioInput = document.getElementById('edit-profile-bio');

        const newName = nameInput ? nameInput.value.trim() : user.name;
        let newBio = bioInput ? bioInput.value.trim() : user.bio;

        if (!newName) {
            window.showToast('Please enter your full name.', 'alert-circle');
            return;
        }

        if (newBio.length > 160) {
            newBio = newBio.substring(0, 160);
        }

        user.name = newName;
        user.bio = newBio;
        user.avatarInitial = newName.charAt(0).toUpperCase();

        window.EcoStorage.saveCurrentUser(user);

        // Immediate UI updates across all components (no page reload)
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = newName;

        const bioEl = document.getElementById('profile-bio');
        if (bioEl) bioEl.textContent = newBio || '';

        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) avatarEl.textContent = user.avatarInitial;

        const editAvatarPreview = document.getElementById('edit-avatar-preview');
        if (editAvatarPreview) editAvatarPreview.textContent = user.avatarInitial;

        const navName = document.getElementById('nav-name');
        if (navName) navName.textContent = newName;

        const navAvatar = document.getElementById('nav-avatar');
        if (navAvatar) navAvatar.textContent = user.avatarInitial;

        const dashGreeting = document.getElementById('dash-greeting');
        const hour = new Date().getHours();
        let timeGreeting = 'Good morning';
        if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
        else if (hour >= 17) timeGreeting = 'Good evening';
        if (dashGreeting) dashGreeting.textContent = `${timeGreeting}, ${newName.split(' ')[0] || 'Explorer'}`;

        const dashName = document.getElementById('dash-name');
        if (dashName) dashName.textContent = newName.split(' ')[0];

        window.showToast('Profile updated successfully!', 'check');
    }

    // Expose API
    window.EcoProfile = {
        renderProfile,
        saveProfileChanges,
        cancelProfileEdit,
        updateBioCharCount
    };

    // Backward-compatibility aliases
    window.renderProfile = renderProfile;
    window.saveProfileChanges = saveProfileChanges;
})();
