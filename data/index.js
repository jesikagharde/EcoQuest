/**
 * ECOQUEST UNIFIED DATA REPOSITORY (data/index.js)
 * Assembles all modular data definitions into a single global window.EcoData object.
 */
(function() {
    const EcoData = {
        topics: window.EcoTopicsData || [],
        ecoIQQuestions: window.EcoIQData || [],
        missions: window.EcoMissionsData || [],
        materials: window.EcoMaterialsData || [],
        creativeProjects: window.EcoCreativeProjectsData || [],
        ecoDecisions: window.EcoDecisionsData || [],
        badges: window.EcoBadgesData || [],
        journeyStages: window.EcoJourneyData || []
    };

    window.EcoData = EcoData;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = EcoData;
    }
})();
