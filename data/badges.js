/**
 * ECOQUEST DATA MODULE: ACHIEVEMENTS & BADGES
 * 12 Verifiable Milestone Badges with dynamic unlock evaluation rules.
 */
(function() {
    const badges = [
        {
            id: 'b_1',
            title: 'First Step',
            desc: 'Initiate your sustainability journey by completing your first mission, topic, or assessment.',
            icon: '🌱',
            lucideIcon: 'sprout',
            category: 'Getting Started',
            checkUnlock: (user) => {
                const topicsDone = Object.values(user.topicProgress || {}).filter(t => t.status === 'Completed').length;
                const missionsDone = Object.values(user.missionProgress || {}).filter(m => m.status === 'Completed').length;
                const projectsDone = Object.values(user.creativeProgress || {}).filter(p => p.status === 'Completed').length;
                const quizDone = (user.assessmentHistory && user.assessmentHistory.length > 0) || (typeof user.ecoIQ === 'number');
                return (topicsDone + missionsDone + projectsDone > 0) || quizDone;
            }
        },
        {
            id: 'b_2',
            title: 'EcoIQ Explorer',
            desc: 'Complete your first diagnostic EcoIQ assessment to benchmark environmental knowledge.',
            icon: '🧠',
            lucideIcon: 'brain-circuit',
            category: 'Assessment',
            checkUnlock: (user) => {
                return (user.assessmentHistory && user.assessmentHistory.length > 0) || (typeof user.ecoIQ === 'number');
            }
        },
        {
            id: 'b_3',
            title: 'Eco Champion',
            desc: 'Achieve an elite score of 90% or higher on any EcoIQ assessment.',
            icon: '🏆',
            lucideIcon: 'award',
            category: 'Assessment',
            checkUnlock: (user) => {
                if (user.assessmentHistory && user.assessmentHistory.some(a => a.score >= 90)) return true;
                return (typeof user.ecoIQ === 'number' && user.ecoIQ >= 90);
            }
        },
        {
            id: 'b_4',
            title: 'Waste Warrior',
            desc: 'Master at least 3 Waste & Circular Living topics or missions.',
            icon: '♻️',
            lucideIcon: 'trash-2',
            category: 'Waste',
            checkUnlock: (user, data) => {
                let count = 0;
                // Check completed topics with category 'Waste'
                if (data && data.topics && user.topicProgress) {
                    data.topics.filter(t => t.category.includes('Waste')).forEach(t => {
                        if (user.topicProgress[t.id]?.status === 'Completed') count++;
                    });
                }
                // Check completed missions with category 'Waste'
                if (data && data.missions && user.missionProgress) {
                    data.missions.filter(m => m.category === 'Waste').forEach(m => {
                        if (user.missionProgress[m.id]?.status === 'Completed') count++;
                    });
                }
                return count >= 3;
            }
        },
        {
            id: 'b_5',
            title: 'Water Wise',
            desc: 'Complete 3 or more Water Conservation topics or audit missions.',
            icon: '💧',
            lucideIcon: 'droplet',
            category: 'Water',
            checkUnlock: (user, data) => {
                let count = 0;
                if (data && data.topics && user.topicProgress) {
                    data.topics.filter(t => t.category.includes('Water')).forEach(t => {
                        if (user.topicProgress[t.id]?.status === 'Completed') count++;
                    });
                }
                if (data && data.missions && user.missionProgress) {
                    data.missions.filter(m => m.category === 'Water').forEach(m => {
                        if (user.missionProgress[m.id]?.status === 'Completed') count++;
                    });
                }
                return count >= 3;
            }
        },
        {
            id: 'b_6',
            title: 'Energy Aware',
            desc: 'Complete 3 or more Energy Efficiency topics or missions at home.',
            icon: '⚡',
            lucideIcon: 'zap',
            category: 'Energy',
            checkUnlock: (user, data) => {
                let count = 0;
                if (data && data.topics && user.topicProgress) {
                    data.topics.filter(t => t.category.includes('Energy')).forEach(t => {
                        if (user.topicProgress[t.id]?.status === 'Completed') count++;
                    });
                }
                if (data && data.missions && user.missionProgress) {
                    data.missions.filter(m => m.category === 'Energy').forEach(m => {
                        if (user.missionProgress[m.id]?.status === 'Completed') count++;
                    });
                }
                return count >= 3;
            }
        },
        {
            id: 'b_7',
            title: 'Creative Reuser',
            desc: 'Build and complete at least 2 DIY upcycling projects from household waste.',
            icon: '✂️',
            lucideIcon: 'scissors',
            category: 'Creativity',
            checkUnlock: (user) => {
                const count = Object.values(user.creativeProgress || {}).filter(p => p.status === 'Completed').length;
                return count >= 2;
            }
        },
        {
            id: 'b_8',
            title: 'Mission Maker',
            desc: 'Successfully complete 5 verified real-world Eco Missions.',
            icon: '🎯',
            lucideIcon: 'target',
            category: 'Action',
            checkUnlock: (user) => {
                const count = Object.values(user.missionProgress || {}).filter(m => m.status === 'Completed').length;
                return count >= 5;
            }
        },
        {
            id: 'b_9',
            title: 'Eco Scholar',
            desc: 'Master and pass knowledge checks for 10 or more Learning Topics.',
            icon: '📚',
            lucideIcon: 'book-open',
            category: 'Learning',
            checkUnlock: (user) => {
                const count = Object.values(user.topicProgress || {}).filter(t => t.status === 'Completed').length;
                return count >= 10;
            }
        },
        {
            id: 'b_10',
            title: 'Streak Master',
            desc: 'Achieve a 5-question consecutive correct streak during any EcoIQ assessment.',
            icon: '🔥',
            lucideIcon: 'flame',
            category: 'Mastery',
            checkUnlock: (user) => {
                return (user.highestQuizStreak || 0) >= 5;
            }
        },
        {
            id: 'b_11',
            title: 'Master Recycler',
            desc: 'Consult EcoLens for 5 or more waste disposal & segregation inquiries.',
            icon: '🔍',
            lucideIcon: 'search',
            category: 'Tools',
            checkUnlock: (user) => {
                return (user.ecolensUsageCount || 0) >= 5;
            }
        },
        {
            id: 'b_12',
            title: 'Planet Protector',
            desc: 'Advance to Level 5 and accumulate 1,000+ total earned EcoXP.',
            icon: '🌍',
            lucideIcon: 'globe',
            category: 'Mastery',
            checkUnlock: (user) => {
                return (user.xp || 0) >= 1000;
            }
        }
    ];

    if (typeof window !== 'undefined') {
        window.EcoBadgesData = badges;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = badges;
    }
})();
