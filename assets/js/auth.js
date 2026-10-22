/**
 * ECOQUEST AUTHENTICATION MODULE (assets/js/auth.js)
 * Secure local client-side authentication, password hashing, registration, and login.
 */
(function() {
    /**
     * Web Crypto SHA-256 Hashing with Base64 fallback for non-HTTPS local setups
     */
    async function hashPassword(plainPassword) {
        if (!plainPassword) return '';
        try {
            if (window.crypto && window.crypto.subtle) {
                const encoder = new TextEncoder();
                const data = encoder.encode(plainPassword);
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }
        } catch (err) {
            console.warn('WebCrypto subtle unavailable; using string fallback.');
        }
        return btoa(unescape(encodeURIComponent(plainPassword)));
    }

    /**
     * Register a new user account
     */
    async function registerUser(name, email, password, confirmPassword) {
        const cleanName = (name || '').trim();
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPassword = (password || '').trim();
        const cleanConfirm = (confirmPassword || '').trim();

        if (!cleanName) {
            return { success: false, message: 'Please enter your full name.' };
        }
        if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
            return { success: false, message: 'Please provide a valid email address.' };
        }
        if (cleanPassword.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long.' };
        }
        if (cleanPassword !== cleanConfirm) {
            return { success: false, message: 'Passwords do not match. Please verify.' };
        }

        const db = window.EcoStorage.getUsersDB();
        const existing = db.find(u => u.email.toLowerCase() === cleanEmail);
        if (existing) {
            return { success: false, message: 'An account with this email already exists. Please log in.' };
        }

        const passwordHash = await hashPassword(cleanPassword);
        const newUser = window.EcoStorage.getDefaultUser();
        newUser.name = cleanName;
        newUser.email = cleanEmail;
        newUser.passwordHash = passwordHash;
        newUser.avatarInitial = cleanName.charAt(0).toUpperCase();

        // Save session & DB
        window.EcoStorage.saveCurrentUser(newUser);
        return { success: true, user: newUser };
    }

    /**
     * Authenticate an existing user
     */
    async function loginUser(email, password) {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPassword = (password || '').trim();

        if (!cleanEmail || !cleanPassword) {
            return { success: false, message: 'Please enter both email and password.' };
        }

        const db = window.EcoStorage.getUsersDB();
        const user = db.find(u => u.email.toLowerCase() === cleanEmail);

        if (!user) {
            return { success: false, message: 'No account found with this email address. Please register first.' };
        }

        const inputHash = await hashPassword(cleanPassword);
        if (user.passwordHash && user.passwordHash !== inputHash) {
            return { success: false, message: 'Incorrect password. Please try again.' };
        }

        // Login successful
        window.EcoStorage.saveCurrentUser(user);
        return { success: true, user };
    }

    /**
     * Terminate current session
     */
    function logoutUser() {
        localStorage.removeItem(window.EcoStorage.STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    }

    window.EcoAuth = {
        hashPassword,
        registerUser,
        loginUser,
        logoutUser,
        register: registerUser,
        login: loginUser,
        logout: logoutUser
    };
})();
