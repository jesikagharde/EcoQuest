const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ECOQUEST FINAL SUBMISSION VALIDATION SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  [PASS] ${message}`);
    } else {
        console.error(`  [FAIL] ${message}`);
    }
}

// 1. Check required active files existence
const requiredFiles = [
    'index.html',
    'app.html',
    'README.md',
    'assets/css/style.css',
    'assets/images/ecoquest-logo.png',
    'assets/images/ecoquest-mark.png',
    'assets/images/favicon.png',
    'data/topics.js',
    'data/ecoiq.js',
    'data/missions.js',
    'data/creative-projects.js',
    'data/ecolens.js',
    'data/badges.js',
    'data/journey.js',
    'data/index.js',
    'assets/js/storage.js',
    'assets/js/auth.js',
    'assets/js/quiz.js',
    'assets/js/learning.js',
    'assets/js/missions.js',
    'assets/js/create.js',
    'assets/js/ecolens.js',
    'assets/js/bookmarks.js',
    'assets/js/profile.js',
    'assets/js/progress.js',
    'assets/js/app.js'
];

console.log('1. Checking Active File Existence:');
requiredFiles.forEach(file => {
    assert(fs.existsSync(path.join(__dirname, file)), `Active file exists: ${file}`);
});

// 2. Check that deleted duplicate / legacy files NO LONGER exist
const deletedFiles = [
    'app.js',
    'data.js',
    'style.css',
    'legacy',
    'legacy/dashboard.html',
    'legacy/script.js',
    'assets/images/ecoquest-logo-original.png',
    'assets/images/ecoquest-logo.svg',
    'assets/images/ecoquest-logo-light.svg',
    'assets/images/ecoquest-mark.svg'
];

console.log('\n2. Verifying Deleted Legacy & Duplicate Files:');
deletedFiles.forEach(file => {
    assert(!fs.existsSync(path.join(__dirname, file)), `Unnecessary file removed: ${file}`);
});

// 3. Load and validate modular data datasets in sandbox
console.log('\n3. Validating Modular Data Datasets:');
const mockWindow = {
    EcoData: {},
    localStorage: {
        store: {},
        getItem(k) { return this.store[k] || null; },
        setItem(k, v) { this.store[k] = String(v); },
        removeItem(k) { delete this.store[k]; }
    },
    document: {
        addEventListener() {},
        querySelectorAll() { return []; },
        getElementById() { return null; },
        body: { classList: { add() {}, remove() {}, contains() { return false; } }, setAttribute() {} },
        documentElement: { style: { setProperty() {} }, setAttribute() {} }
    },
    matchMedia() { return { matches: false }; }
};
mockWindow.window = mockWindow;

const context = vm.createContext(mockWindow);

try {
    const dataFiles = [
        'data/topics.js',
        'data/ecoiq.js',
        'data/missions.js',
        'data/creative-projects.js',
        'data/ecolens.js',
        'data/badges.js',
        'data/journey.js',
        'data/index.js'
    ];

    dataFiles.forEach(f => {
        const code = fs.readFileSync(path.join(__dirname, f), 'utf8');
        vm.runInContext(code, context);
    });

    const ecoData = mockWindow.EcoData;
    assert(Array.isArray(ecoData.topics) && ecoData.topics.length === 25, `Topics count is exactly 25 (found ${ecoData.topics?.length})`);
    assert(Array.isArray(ecoData.ecoIQQuestions) && ecoData.ecoIQQuestions.length >= 60, `EcoIQ questions count >= 60 (found ${ecoData.ecoIQQuestions?.length})`);
    assert(Array.isArray(ecoData.missions) && ecoData.missions.length === 20, `Missions count is exactly 20 (found ${ecoData.missions?.length})`);
    assert(Array.isArray(ecoData.creativeProjects) && ecoData.creativeProjects.length === 16, `Creative projects count is exactly 16 (found ${ecoData.creativeProjects?.length})`);
    assert(Array.isArray(ecoData.ecoDecisions) && ecoData.ecoDecisions.length === 24, `EcoLens decisions count is exactly 24 (found ${ecoData.ecoDecisions?.length})`);
    assert(Array.isArray(ecoData.badges) && ecoData.badges.length === 12, `Badges count is exactly 12 (found ${ecoData.badges?.length})`);
    assert(Array.isArray(ecoData.journeyStages) && ecoData.journeyStages.length === 8, `Journey stages count is exactly 8 (found ${ecoData.journeyStages?.length})`);

} catch (err) {
    assert(false, `Data datasets evaluation failed: ${err.message}`);
}

// 4. Check HTML content and required IDs
console.log('\n4. Validating app.html Markup & Component IDs:');
const appHtml = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf8');

const requiredIds = [
    'app-sidebar',
    'sidebar-toggle-btn',
    'sidebar-toggle-icon',
    'sidebar-nav',
    'current-page-title',
    'nav-avatar',
    'nav-name',
    'app-content',
    'view-dashboard',
    'dash-greeting',
    'dash-focus-banner',
    'dash-active-missions-banner',
    'stat-iq',
    'stat-xp',
    'stat-missions',
    'stat-projects',
    'btn-quick-quest',
    'view-ecoiq',
    'ecoiq-selector-view',
    'ecoiq-quiz-view',
    'ecoiq-result-view',
    'view-journey',
    'journey-timeline',
    'view-learn',
    'topics-grid',
    'topic-filter-category',
    'topic-search-input',
    'view-missions',
    'missions-grid',
    'mission-filter-category',
    'mission-filter-difficulty',
    'mission-filter-status',
    'view-create',
    'materials-chips',
    'creative-projects-grid',
    'view-ecolens',
    'ecolens-search',
    'ecolens-clear-btn',
    'ecolens-file-input',
    'ecolens-results',
    'view-progress',
    'prog-xp',
    'prog-topics',
    'prog-missions',
    'prog-projects',
    'prog-quizzes',
    'prog-category-bars',
    'prog-badges-grid',
    'view-bookmarks',
    'bookmarks-grid',
    'view-profile',
    'profile-avatar',
    'profile-name',
    'profile-email',
    'profile-bio',
    'profile-level-badge',
    'profile-xp-text',
    'profile-xp-bar',
    'edit-avatar-preview',
    'edit-profile-name',
    'edit-profile-email',
    'edit-profile-bio',
    'bio-char-count',
    'view-settings',
    'project-modal',
    'topic-modal',
    'quiz-review-modal',
    'global-search-modal'
];

requiredIds.forEach(id => {
    assert(appHtml.includes(`id="${id}"`), `app.html contains id="${id}"`);
});

// 5. Verify Complete Removal of Dark Theme & Reset Demo Data from UI
console.log('\n5. Verifying Dark Theme & Reset Demo Data Removal:');
assert(!appHtml.includes('dark-theme'), 'app.html contains no dark-theme classes');
assert(!appHtml.includes('settings-theme'), 'app.html contains no settings-theme controls');
assert(!appHtml.includes('toggleTheme'), 'app.html contains no toggleTheme function calls');
assert(!appHtml.includes('Reset Local Demo Data'), 'app.html does NOT contain visible "Reset Local Demo Data"');
assert(!appHtml.includes('Reset Demo Data'), 'app.html does NOT contain visible "Reset Demo Data"');
assert(appHtml.includes('Customize how EcoQuest looks and feels.'), 'app.html contains clean Settings subtitle');

// 6. Verify Light Theme Accent Variables and absence of Dark Theme in CSS
console.log('\n6. Validating CSS Stylesheet & Accent System:');
const cssContent = fs.readFileSync(path.join(__dirname, 'assets/css/style.css'), 'utf8');

assert(cssContent.includes('--accent-primary'), 'CSS defines --accent-primary variable');
assert(cssContent.includes('body[data-accent="forest"]'), 'CSS defines body[data-accent="forest"]');
assert(cssContent.includes('body[data-accent="ocean"]'), 'CSS defines body[data-accent="ocean"]');
assert(cssContent.includes('body[data-accent="earth"]'), 'CSS defines body[data-accent="earth"]');
assert(cssContent.includes('body[data-accent="sage"]'), 'CSS defines body[data-accent="sage"]');
assert(cssContent.includes('body[data-accent="sunset"]'), 'CSS defines body[data-accent="sunset"]');
assert(!cssContent.includes('body.dark-theme'), 'CSS contains NO body.dark-theme rules');
assert(cssContent.includes('.profile-editor-card'), 'CSS defines .profile-editor-card');
assert(cssContent.includes('.accent-palette-grid'), 'CSS defines .accent-palette-grid');
assert(cssContent.includes('.ecolens-search-wrapper'), 'CSS defines .ecolens-search-wrapper');

// 7. Verify JS Modules syntax and evaluation
console.log('\n7. Validating JS Application Logic Modules:');
const jsFiles = [
    'assets/js/storage.js',
    'assets/js/auth.js',
    'assets/js/quiz.js',
    'assets/js/learning.js',
    'assets/js/missions.js',
    'assets/js/create.js',
    'assets/js/ecolens.js',
    'assets/js/bookmarks.js',
    'assets/js/profile.js',
    'assets/js/progress.js',
    'assets/js/app.js'
];

jsFiles.forEach(f => {
    try {
        const code = fs.readFileSync(path.join(__dirname, f), 'utf8');
        vm.runInContext(code, context);
        assert(true, `JS Module parsed and evaluated without error: ${f}`);
    } catch (err) {
        assert(false, `JS Module error in ${f}: ${err.message}`);
    }
});

// 8. Verify README accuracy and Future Scope
console.log('\n8. Validating README.md Documentation:');
const readmeContent = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
assert(readmeContent.includes('8 dynamic progression roadmap stages') || readmeContent.includes('My Eco Journey Roadmap (8 Stages)'), 'README references exactly 8 journey stages');
assert(readmeContent.includes('## 🔮 Future Scope') || readmeContent.includes('## Future Scope'), 'README includes Future Scope section');
assert(readmeContent.includes('1. Backend & Cloud Database'), 'Future Scope includes Backend & Cloud Database');
assert(readmeContent.includes('11. EcoQuest Campus Mode'), 'Future Scope includes EcoQuest Campus Mode');
assert(!readmeContent.includes('100% Local & Offline'), 'README avoids unsupported 100% offline claims');
assert(!readmeContent.includes('zero-dependency'), 'README avoids unsupported zero-dependency claims');

console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log(`========================================\n`);

if (totalTests === passedTests) {
    process.exit(0);
} else {
    process.exit(1);
}
