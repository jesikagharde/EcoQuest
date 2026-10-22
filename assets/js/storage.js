/**
 * ECOQUEST CORE STORAGE & SCHEMA MANAGER (assets/js/storage.js)
 * Manages localStorage persistence, safe schema migrations, and user session state.
 */
(function() {
    const STORAGE_KEYS = {
        CURRENT_USER: 'eq_currentUser',
        USERS_DB: 'eq_usersDB',
        ACCENT: 'eq_accent',
        SIDEBAR: 'eq_sidebar'
    };

    /**
     * Default user object schema
     */
    function getDefaultUser() {
        return {
            id: 'user_' + Date.now(),
            name: '',
            email: '',
            passwordHash: '',
            bio: '',
            avatarInitial: '',
            avatarColor: 'forest',
            xp: 0,
            level: 1,
            streak: 1,
            highestQuizStreak: 0,
            lastActiveDate: new Date().toISOString().split('T')[0],
            quickQuestCompletedDate: '',
            
            // Assessment state
            ecoIQ: null,
            ecoIQCategoryScores: {},
            ecoIQDetails: null,
            assessmentHistory: [],
            
            // Progress tracking
            topicProgress: {},       // { [topicId]: { status: 'Completed'|'In Progress', progressPercent: 100, completedAt } }
            missionProgress: {},     // { [missionId]: { status: 'Available'|'In Progress'|'Completed'|'Skipped', startedAt, completedAt } }
            creativeProgress: {},    // { [projectId]: { status: 'Completed', completedAt } }
            communityProgress: {},   // { [challengeId]: { joined: true, progress: 0..100, completed: boolean } }
            
            // Collections & Tools
            savedProjects: [],       // Array of project IDs
            bookmarks: {
                topics: [],
                missions: [],
                projects: [],
                ecolens: []
            },
            ecolensUsageCount: 0,
            badges: [],              // Array of badge IDs
            
            // Preferences
            accent: 'forest',
            sidebarCollapsed: false
        };
    }

    /**
     * Safe schema migration ensuring legacy objects acquire all new properties
     */
    function migrateUserData(user) {
        if (!user || typeof user !== 'object') {
            return getDefaultUser();
        }

        const defaults = getDefaultUser();
        const migrated = Object.assign({}, defaults, user);

        // Ensure sub-objects exist
        migrated.topicProgress = migrated.topicProgress || {};
        migrated.missionProgress = migrated.missionProgress || {};
        migrated.creativeProgress = migrated.creativeProgress || {};
        migrated.communityProgress = migrated.communityProgress || {};
        migrated.assessmentHistory = Array.isArray(migrated.assessmentHistory) ? migrated.assessmentHistory : [];
        migrated.savedProjects = Array.isArray(migrated.savedProjects) ? migrated.savedProjects : [];
        migrated.badges = Array.isArray(migrated.badges) ? migrated.badges : [];
        
        // Ensure bookmarks structure
        if (!migrated.bookmarks || typeof migrated.bookmarks !== 'object') {
            migrated.bookmarks = {
                topics: [],
                missions: [],
                projects: Array.isArray(migrated.savedProjects) ? [...migrated.savedProjects] : [],
                ecolens: []
            };
        } else {
            migrated.bookmarks.topics = Array.isArray(migrated.bookmarks.topics) ? migrated.bookmarks.topics : [];
            migrated.bookmarks.missions = Array.isArray(migrated.bookmarks.missions) ? migrated.bookmarks.missions : [];
            migrated.bookmarks.projects = Array.isArray(migrated.bookmarks.projects) ? migrated.bookmarks.projects : (migrated.savedProjects || []);
            migrated.bookmarks.ecolens = Array.isArray(migrated.bookmarks.ecolens) ? migrated.bookmarks.ecolens : [];
        }

        // Calculate Level from XP
        // Level 1: 0-149 XP, Level 2: 150-349 XP, Level 3: 350-649 XP, Level 4: 650-999 XP, Level 5: 1000+ XP
        migrated.xp = typeof migrated.xp === 'number' ? migrated.xp : 0;
        if (migrated.xp >= 1000) migrated.level = 5;
        else if (migrated.xp >= 650) migrated.level = 4;
        else if (migrated.xp >= 350) migrated.level = 3;
        else if (migrated.xp >= 150) migrated.level = 2;
        else migrated.level = 1;

        // Ensure avatar initial
        if (!migrated.avatarInitial && migrated.name) {
            migrated.avatarInitial = migrated.name.charAt(0).toUpperCase();
        }

        // Clean legacy preset default bio string
        if (migrated.bio === 'Passionate about sustainable living, zero-waste habits, and circular creativity.') {
            migrated.bio = '';
        }

        return migrated;
    }

    /**
     * Retrieve current authenticated user
     */
    function getCurrentUser() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed && (parsed.email === 'user@ecoquest.org' || parsed.name === 'Eco Explorer')) {
                localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
                return null;
            }
            return migrateUserData(parsed);
        } catch (e) {
            console.error('Error reading current user session:', e);
            return null;
        }
    }

    /**
     * Save active user session and synchronize into local users database
     */
    function saveCurrentUser(user) {
        try {
            if (!user) {
                localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
                return;
            }

            const migrated = migrateUserData(user);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(migrated));

            // Sync with local users DB (only registered users)
            const db = getUsersDB();
            if (migrated.email && migrated.email !== 'user@ecoquest.org') {
                const idx = db.findIndex(u => u.email.toLowerCase() === migrated.email.toLowerCase());
                if (idx > -1) {
                    db[idx] = Object.assign({}, db[idx], migrated);
                } else {
                    db.push(migrated);
                }
                saveUsersDB(db);
            }
        } catch (e) {
            console.error('Error saving user session:', e);
        }
    }

    /**
     * Retrieve all registered local accounts
     */
    function getUsersDB() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed
                .filter(u => u && u.email !== 'user@ecoquest.org' && u.name !== 'Eco Explorer')
                .map(migrateUserData);
        } catch (e) {
            console.error('Error reading users DB:', e);
            return [];
        }
    }

    /**
     * Save all registered local accounts
     */
    function saveUsersDB(db) {
        try {
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
        } catch (e) {
            console.error('Error saving users DB:', e);
        }
    }

    /**
     * Reset all local demo data with fresh clean initial state
     */
    function resetLocalData() {
        try {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
            localStorage.removeItem(STORAGE_KEYS.USERS_DB);
            localStorage.removeItem(STORAGE_KEYS.ACCENT);
            localStorage.removeItem(STORAGE_KEYS.SIDEBAR);
            return true;
        } catch (e) {
            console.error('Error resetting local data:', e);
            return false;
        }
    }

    /**
     * Increment user XP safely, recalculate level, and save
     */
    function awardXP(amount, reason) {
        const user = getCurrentUser() || getDefaultUser();
        const safeAmount = typeof amount === 'number' && amount > 0 ? amount : 0;
        user.xp = (user.xp || 0) + safeAmount;
        const updated = migrateUserData(user);
        saveCurrentUser(updated);
        return updated;
    }

    window.EcoStorage = {
        STORAGE_KEYS,
        getDefaultUser,
        migrateUserData,
        getCurrentUser,
        saveCurrentUser,
        getUsersDB,
        saveUsersDB,
        resetLocalData,
        awardXP
    };
})();
