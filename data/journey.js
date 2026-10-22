/**
 * ECOQUEST DATA MODULE: MY ECO JOURNEY ROADMAP (data/journey.js)
 * Exactly 8 Meaningful, Requirement-Based Progression Stages.
 * Progression is validated against actual user achievements rather than generic XP.
 */
(function() {
    const journeyStages = [
        {
            stage: 1,
            id: 'stage_1',
            title: 'Eco Foundations',
            category: 'Waste & Circularity',
            badgeName: 'Green Initiate',
            icon: 'compass',
            desc: 'Establish rock-solid daily segregation habits, understand municipal waste streams, and benchmark your environmental baseline.',
            requirements: [
                { id: 'req_1_ecoiq', type: 'ecoiq', label: 'Complete any EcoIQ Assessment', minScore: 1 },
                { id: 'req_1_topic', type: 'topic', targetId: 'top_1', label: 'Master Topic: Municipal Waste Segregation' },
                { id: 'req_1_mission', type: 'mission', targetId: 'm_3', label: 'Complete Mission: Zero-Packaging Lunch' }
            ]
        },
        {
            stage: 2,
            id: 'stage_2',
            title: 'Waste & Circular Living',
            category: 'Waste & Circularity',
            badgeName: 'Circular Crafter',
            icon: 'recycle',
            desc: 'Eliminate single-use plastic packaging, practice mindful shopping, and transform discarded cardboard into useful storage.',
            requirements: [
                { id: 'req_2_topic', type: 'topic', targetId: 'top_20', label: 'Master Topic: Zero-Waste Grocery Shopping' },
                { id: 'req_2_mission', type: 'mission', targetId: 'm_11', label: 'Complete Mission: Plastic Bag Swap Kit' },
                { id: 'req_2_project', type: 'project', targetId: 'proj_1', label: 'Complete DIY Craft: Desk Organizer' }
            ]
        },
        {
            stage: 3,
            id: 'stage_3',
            title: 'Water Stewardship',
            category: 'Water Conservation',
            badgeName: 'Water Guardian',
            icon: 'droplets',
            desc: 'Audit home plumbing fixtures for silent drips, recover rinse water, and optimize daily hygiene consumption.',
            requirements: [
                { id: 'req_3_topic', type: 'topic', targetId: 'top_2', label: 'Master Topic: Water Stewardship & Leak Audits' },
                { id: 'req_3_mission', type: 'mission', targetId: 'm_1', label: 'Complete Mission: 5-Minute Tap Leak Audit' },
                { id: 'req_3_mission2', type: 'mission', targetId: 'm_7', label: 'Complete Mission: 4-Minute Shower Challenge' }
            ]
        },
        {
            stage: 4,
            id: 'stage_4',
            title: 'Energy & Climate',
            category: 'Energy & Climate',
            badgeName: 'Energy Optimizer',
            icon: 'zap',
            desc: 'Hunt standby vampire loads, harness natural daylighting, and understand the clean renewable energy transition.',
            requirements: [
                { id: 'req_4_topic', type: 'topic', targetId: 'top_3', label: 'Master Topic: Phantom Loads & Energy Efficiency' },
                { id: 'req_4_mission', type: 'mission', targetId: 'm_2', label: 'Complete Mission: Standby Vampire Power Hunt' },
                { id: 'req_4_mission2', type: 'mission', targetId: 'm_6', label: 'Complete Mission: Single-Day Daylight Maximizer' }
            ]
        },
        {
            stage: 5,
            id: 'stage_5',
            title: 'Food & Sustainable Consumption',
            category: 'Food & Organic Living',
            badgeName: 'Organic Pioneer',
            icon: 'apple',
            desc: 'Prevent household food spoilage, adopt plant-forward nutrition, and understand the 6 Rs consumption hierarchy.',
            requirements: [
                { id: 'req_5_topic', type: 'topic', targetId: 'top_5', label: 'Master Topic: Food Waste Prevention & Composting' },
                { id: 'req_5_mission', type: 'mission', targetId: 'm_8', label: 'Complete Mission: Food-Waste Rescue Recipe' },
                { id: 'req_5_mission2', type: 'mission', targetId: 'm_19', label: 'Complete Mission: 3-Day Plant-Forward Meal Plan' }
            ]
        },
        {
            stage: 6,
            id: 'stage_6',
            title: 'E-Waste & Sustainable Technology',
            category: 'E-Waste & Technology',
            badgeName: 'Digital Cleaner',
            icon: 'smartphone',
            desc: 'Isolate toxic battery chemistry, set up dedicated e-waste recycling bins, and purge digital cloud server footprints.',
            requirements: [
                { id: 'req_6_topic', type: 'topic', targetId: 'top_4', label: 'Master Topic: E-Waste Lifecycle & Tech Habits' },
                { id: 'req_6_topic2', type: 'topic', targetId: 'top_22', label: 'Master Topic: Digital Carbon Declutter' },
                { id: 'req_6_mission', type: 'mission', targetId: 'm_5', label: 'Complete Mission: Dedicated E-Waste Drop Box' }
            ]
        },
        {
            stage: 7,
            id: 'stage_7',
            title: 'Biodiversity & Sustainable Living',
            category: 'Biodiversity & Nature',
            badgeName: 'Habitat Hero',
            icon: 'trees',
            desc: 'Support local pollinators with water stations, adopt non-toxic botanical cleaners, and nurture native plant corridors.',
            requirements: [
                { id: 'req_7_topic', type: 'topic', targetId: 'top_8', label: 'Master Topic: Urban Biodiversity & Pollinators' },
                { id: 'req_7_mission', type: 'mission', targetId: 'm_9', label: 'Complete Mission: Balcony Pollinator Station' },
                { id: 'req_7_mission2', type: 'mission', targetId: 'm_12', label: 'Complete Mission: DIY Citrus Surface Cleaner' }
            ]
        },
        {
            stage: 8,
            id: 'stage_8',
            title: 'Community Leadership',
            category: 'Climate Awareness',
            badgeName: 'Eco Champion',
            icon: 'award',
            desc: 'Drive collective neighborhood cleanups, switch to active decarbonized transit, and inspire lasting institutional change.',
            requirements: [
                { id: 'req_8_topic', type: 'topic', targetId: 'top_11', label: 'Master Topic: Carbon Footprints & Climate Science' },
                { id: 'req_8_mission', type: 'mission', targetId: 'm_15', label: 'Complete Mission: Neighborhood Micro-Clean Drive' },
                { id: 'req_8_mission2', type: 'mission', targetId: 'm_10', label: 'Complete Mission: 2-Day Car-Free Commute' }
            ]
        }
    ];

    if (typeof window !== 'undefined') {
        window.EcoJourneyData = journeyStages;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = journeyStages;
    }
})();
