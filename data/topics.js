/**
 * ECOQUEST DATA MODULE: LEARNING TOPICS
 * 25 Comprehensive Environmental Topics with interactive knowledge checks,
 * practical everyday examples, key principles, and related missions/projects.
 */
(function() {
    const topics = [
        {
            id: 'top_1',
            category: 'Waste & Circularity',
            title: 'Municipal Waste Segregation & Circular Habits',
            shortDescription: 'Master the principles of dry vs wet segregation, clean material recovery, and closing resource loops at home.',
            whyItMatters: 'Over 60% of urban landfill waste consists of mixed organic food and recyclable dry fractions that could be recovered. Unsegregated waste decomposes anaerobically into methane, a greenhouse gas 28x more potent than CO2.',
            keyPoints: [
                'Wet waste (kitchen scraps, vegetable peels, tea leaves) should be kept strictly separate from dry items.',
                'Dry recyclables (paper, plastic, glass, metals) must be clean and unsoiled to retain recycling market value.',
                'Hazardous household items (batteries, chemicals, e-waste) must never enter general waste streams.',
                'Contamination in paper recycling causes whole batches of pulp to be discarded at recycling mills.'
            ],
            everydayExamples: [
                'Rinsing milk packets and food cans before placing them in the dry recycling bin.',
                'Maintaining a dedicated small compost pail for kitchen scraps next to your cutting board.',
                'Flattening clean cardboard delivery boxes to maximize collection efficiency.'
            ],
            tips: [
                'Keep a two-bin or three-bin system in your kitchen with distinct visual labels.',
                'Never tie wet organic waste in non-biodegradable plastic bags.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why must plastic containers and tins be rinsed before placing them in dry recycling bins?',
                options: [
                    'To make them smell pleasant during municipal transportation',
                    'Because lingering food grease and liquids contaminate paper/cardboard batches and cause entire recyclable loads to be rejected',
                    'To increase their overall weight for recycling scrap collection',
                    'Rinsing is actually optional and has no impact on recycling yields'
                ],
                correctIndex: 1,
                explanation: 'Food residues and liquids spoil dry recyclables—especially paper fibers—causing sorting facilities to send entire contaminated batches straight to the landfill.'
            },
            relatedMissionIds: ['m_3', 'm_5'],
            relatedEcoLensIds: ['dec_1', 'dec_4', 'dec_5'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_2',
            category: 'Water Conservation',
            title: 'Residential Water Stewardship & Leak Audits',
            shortDescription: 'Uncover hidden tap drips, calculate virtual water footprints, and implement practical high-efficiency water habits.',
            whyItMatters: 'A single faucet leaking one drip per second wastes over 3,000 litres of clean municipal water per year. Global freshwater supply represents less than 1% of all water on Earth.',
            keyPoints: [
                'Silent toilet flapper leaks often waste 200+ litres of treated water every day without audible dripping.',
                'Aerators fitted onto existing faucets can cut water flow by 30-50% without compromising pressure.',
                'Bucket baths or 4-minute shower limits save up to 45 litres per person per day.',
                'Virtual water accounts for the massive unseen water embedded in consumer goods, meat, and cotton apparel.'
            ],
            everydayExamples: [
                'Placing a food dye tablet in the toilet cistern to test for silent flapper leakage.',
                'Reusing vegetable washing water for watering indoor potted plants and balcony herbs.',
                'Turning off running taps while lathering soap, shaving, or brushing teeth.'
            ],
            tips: [
                'Install low-cost screw-on tap aerators across kitchen and bathroom taps.',
                'Collect the initial cold water that runs before the geyser warms up in a bucket for floor cleaning.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'How much water can a single faucet leaking just one drip per second waste in a year?',
                options: [
                    'Roughly 50 litres',
                    'Around 300 litres',
                    'Over 3,000 litres',
                    'Less than 10 litres'
                ],
                correctIndex: 2,
                explanation: 'Continuous slow drips accumulate rapidly: at one drop per second, a single faulty washer wastes over 3,000 litres annually.'
            },
            relatedMissionIds: ['m_1', 'm_7'],
            relatedEcoLensIds: ['dec_14'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_3',
            category: 'Energy & Climate',
            title: 'Phantom Loads & Residential Energy Efficiency',
            shortDescription: 'Identify vampire electricity draws, optimize study lighting, and minimize unnecessary carbon emissions at home.',
            whyItMatters: 'Standby power (vampire load) from idle chargers, microwave displays, and entertainment consoles accounts for 5% to 10% of residential electricity bills globally, powering machines that are not even in active use.',
            keyPoints: [
                'Chargers plugged into active wall sockets continue consuming 0.5W to 2W even when disconnected from phones.',
                'LED bulbs consume up to 80% less electricity than traditional incandescent lights and last 15x longer.',
                'Setting room air conditioners to 24°C instead of 18°C reduces energy consumption by 24-30%.',
                'Natural cross-ventilation and daylighting enhance circadian health and slash peak grid load.'
            ],
            everydayExamples: [
                'Using a master switch power strip for home desk setups to cut power to monitors and accessories at night.',
                'Positioning study desks adjacent to natural window light during peak afternoon hours.',
                'Cleaning refrigerator condenser coils and air filter mesh once every 3 months for optimal heat exchange.'
            ],
            tips: [
                'Always flip the wall switch off when unplugging laptops or phone charging cables.',
                'Keep refrigerator doors closed and check door gaskets with a currency bill test.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why does leaving laptop chargers and microwave plugs permanently turned on waste electricity?',
                options: [
                    'It causes electrical wires to physically evaporate',
                    'Internal transformers and standby circuits draw continuous baseline current even when idle',
                    'Power companies intentionally charge phantom fees for connected cables',
                    'Only devices with active screens consume standby power'
                ],
                correctIndex: 1,
                explanation: 'Internal power supply transformers and standby circuitry maintain passive current draw (vampire load) whenever the wall switch remains live.'
            },
            relatedMissionIds: ['m_2', 'm_4', 'm_6'],
            relatedEcoLensIds: ['dec_2', 'dec_15'],
            relatedProjectId: 'proj_6'
        },
        {
            id: 'top_4',
            category: 'E-Waste & Technology',
            title: 'E-Waste Lifecycle & Responsible Tech Habits',
            shortDescription: 'Understand heavy metal leaching from discarded electronics, proper battery disposal, and digital carbon footprints.',
            whyItMatters: 'Over 50 million metric tons of electronic waste are generated annually. Less than 20% is formally recycled, causing hazardous lead, mercury, cadmium, and arsenic to contaminate groundwater around open dump yards.',
            keyPoints: [
                'Old smartphones, cables, and lithium batteries contain valuable precious metals like gold, copper, and cobalt alongside toxic heavy metals.',
                'Lithium-ion batteries present severe spontaneous combustion fire risks when crushed in standard garbage compactors.',
                'Digital data centers consume roughly 1-2% of global electricity; hoarding duplicate files and spam emails contributes to continuous server cooling loads.',
                'Authorised e-waste collection drives ensure safe mechanical disassembly and precious metal recovery.'
            ],
            everydayExamples: [
                'Taping the metal terminals of 9V and lithium batteries with clear tape before dropping them at recycling kiosks.',
                'Setting up a dedicated shoebox at home to aggregate dead charging cables, earbuds, and peripherals.',
                'Regularly purging cloud photo duplicates and unsubscribing from obsolete marketing newsletters.'
            ],
            tips: [
                'Never dispose of electronics or batteries in wet or dry municipal bins.',
                'Trade in or donate working older gadgets to students or community centers.'
            ],
            estimatedTime: '8 mins',
            difficulty: 'Intermediate',
            xpReward: 35,
            knowledgeCheck: {
                question: 'What is the primary danger of disposing of lithium-ion batteries in standard household trash bins?',
                options: [
                    'They will permanently ruin the metal bin finish',
                    'They can ignite explosive fires when crushed inside collection compactor trucks and leach toxic chemicals',
                    'They dissolve instantaneously upon contact with water',
                    'Municipal waste sorting machines cannot detect metal batteries'
                ],
                correctIndex: 1,
                explanation: 'Compaction trucks and sorting belts can easily puncture lithium cells, causing thermal runaway, intense toxic fires, and groundwater chemical leaching.'
            },
            relatedMissionIds: ['m_4', 'm_5'],
            relatedEcoLensIds: ['dec_2', 'dec_6', 'dec_18'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_5',
            category: 'Food & Organic Living',
            title: 'Food Waste Prevention & Aerobic Composting',
            shortDescription: 'Combat organic waste decomposition in dumps, learn pantry management, and master balcony composting techniques.',
            whyItMatters: 'Approximately one-third of all food produced globally for human consumption is lost or wasted. If food waste were a country, it would be the third-largest greenhouse gas emitter in the world behind China and the USA.',
            keyPoints: [
                'Food rotting in oxygen-deprived landfills produces methane (CH4), whereas proper aerobic composting produces nutrient-rich humus and water vapor.',
                'Meal planning and "first-in, first-out" pantry storage eliminate over 70% of household spoilage.',
                'Balanced composting requires a 3:1 ratio of Brown carbon-rich materials (dry leaves, shredded cardboard) to Green nitrogen-rich materials (vegetable peels, tea bags).',
                'Citrus rinds, heavy dairy, and cooked oils should be restricted in simple home compost bins.'
            ],
            everydayExamples: [
                'Regrowing spring onions and celery stems in a sunny water dish on the kitchen windowsill.',
                'Layering kitchen scraps with crushed dry leaves or shredded egg cartons in a terracotta balcony pot.',
                'Turning slightly stale bread into homemade crunchy croutons or breadcrumbs.'
            ],
            tips: [
                'Designate a "Use First" bin in your refrigerator for produce nearing its peak.',
                'Freeze vegetable trimmings (carrot tops, onion skins, celery ends) in a container to brew homemade vegetable broth.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Intermediate',
            xpReward: 35,
            knowledgeCheck: {
                question: 'What is the ideal balance for maintaining an odor-free, healthy aerobic home compost bin?',
                options: [
                    '100% wet green kitchen scraps with zero dry materials',
                    'A balance of roughly 3 parts dry "browns" (carbon like dry leaves/cardboard) to 1 part fresh "greens" (nitrogen kitchen scraps)',
                    'Adding excess meat bones and dairy daily',
                    'Sealing the container completely airtight without any ventilation holes'
                ],
                correctIndex: 1,
                explanation: 'A 3:1 Carbon (Browns) to Nitrogen (Greens) ratio provides optimal structure, aeration, and moisture for aerobic microorganisms to thrive without producing foul odors.'
            },
            relatedMissionIds: ['m_8'],
            relatedEcoLensIds: ['dec_12', 'dec_13', 'dec_22'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_6',
            category: 'Sustainable Fashion',
            title: 'Circular Wardrobes, Fabric Care & Microplastics',
            shortDescription: 'Extend garment lifespans, recognize synthetic microfiber shedding, and embrace mending and creative repurposing.',
            whyItMatters: 'The fashion industry produces 10% of global carbon emissions and 20% of global wastewater. Synthetic textiles (polyester, nylon, acrylic) shed thousands of non-biodegradable microfibers during every washing machine cycle.',
            keyPoints: [
                'Extending the active life of clothing by just 9 additional months reduces its carbon, water, and waste footprint by 20-30%.',
                'Washing clothes in cold water with full loads minimizes microfiber shedding and saves 90% of washing machine energy.',
                'Natural fibers like organic cotton, linen, and hemp biodegrade safely, whereas synthetic polyester takes 200+ years.',
                'Visible mending, sashiko stitching, and upcycling convert worn clothes into unique functional accessories.'
            ],
            everydayExamples: [
                'Repurposing worn-out denim jeans into heavy-duty grocery tote bags or table coasters.',
                'Air-drying clothes on a drying rack instead of running high-heat tumble dryers.',
                'Using a microfiber-catching laundry bag or washing on gentle, cold-water cycles.'
            ],
            tips: [
                'Wash clothes only when visibly soiled or smelly rather than after a single gentle wear.',
                'Organize clothes swap events with friends or university roommates instead of impulse buying.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'How does washing synthetic garments in cold water help the environment?',
                options: [
                    'It permanently turns polyester into organic cotton',
                    'It drastically reduces fiber friction shedding microplastics and saves up to 90% of the energy used for heating water',
                    'It eliminates the need to use any detergent forever',
                    'Cold water washing has no measurable environmental advantage'
                ],
                correctIndex: 1,
                explanation: 'Cold water minimizes textile thermal stress—reducing synthetic microfiber shedding into waterways—and eliminates the massive electricity load needed to heat water.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_3', 'dec_16'],
            relatedProjectId: 'proj_3'
        },
        {
            id: 'top_7',
            category: 'Plastics & Oceans',
            title: 'Single-Use Plastics, Microplastics & Marine Ecology',
            shortDescription: 'Trace the lifecycle of plastics from fossil fuels to ocean gyres, and adopt zero-waste reusable alternatives.',
            whyItMatters: 'Over 8 million metric tons of plastic enter our oceans annually. Plastics do not decompose; they fragment into microscopic particles that bioaccumulate across marine food webs and tap water systems.',
            keyPoints: [
                'Single-use plastics like straws, cutlery, and thin shopping bags are used for an average of 12 minutes but persist for centuries.',
                'Plastic production is directly tied to petrochemical refining, driving industrial fossil fuel extraction.',
                'Marine wildlife frequently ingest plastic debris, mistaking plastic bags for jellyfish and micro-beads for plankton.',
                'Refusing single-use items at the source is infinitely more impactful than attempting downstream recycling.'
            ],
            everydayExamples: [
                'Carrying a compact stainless steel bottle and foldable cloth tote in your everyday backpack.',
                'Refusing single-use plastic cutlery and disposable condiment sachets when ordering takeout food.',
                'Opting for solid shampoo and body soap bars instead of bottled liquid gels.'
            ],
            tips: [
                'Keep a reusable cutlery set and reusable straw in your college bag or car glovebox.',
                'Choose loose unpackaged vegetables and fruits at local grocery markets.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'What happens to standard petro-plastics when they enter the ocean environment?',
                options: [
                    'They safely dissolve into harmless ocean minerals within a few weeks',
                    'They sink and permanently seal seafloor cracks',
                    'They photomechanically break down into toxic microplastic fragments that persist and enter marine food chains',
                    'They turn into marine nutrition for coral reefs'
                ],
                correctIndex: 2,
                explanation: 'Sunlight and wave action fragment macro-plastics into microscopic particles (microplastics) that absorb environmental toxins and are consumed by fish and marine organisms.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_4', 'dec_19'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_8',
            category: 'Biodiversity & Nature',
            title: 'Urban Biodiversity, Pollinator Corridors & Native Flora',
            shortDescription: 'Support urban wildlife, create balcony pollinator sanctuaries, and understand local ecosystem resilience.',
            whyItMatters: 'Global wildlife populations have declined by an average of 69% over the past 50 years due to habitat loss and pesticide overuse. Urban green corridors provide essential stepping stones for bees, butterflies, and native birds.',
            keyPoints: [
                'Native plants have co-evolved with local insect pollinators, requiring significantly less water and zero chemical fertilizers.',
                'Bees and insect pollinators are responsible for pollinating 1 out of every 3 bites of food we consume.',
                'Balcony gardens, rooftop greenery, and micro-parks mitigate the urban heat island effect.',
                'Chemical pesticides kill beneficial predatory insects like ladybugs, worsening pest imbalances over time.'
            ],
            everydayExamples: [
                'Planting native flowering herbs like tulsi, marigold, lavender, or sunflower in balcony planters.',
                'Setting out a shallow clay water dish with pebbles for birds and thirsty bees during hot summer months.',
                'Leaving fallen dry leaves under garden shrubs as natural mulch and overwintering insect habitats.'
            ],
            tips: [
                'Avoid exotic invasive ornamental plants that provide zero nectar value to local pollinators.',
                'Use natural neem oil spray instead of synthetic chemical insecticides for houseplant care.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why are native plant species far superior for supporting urban pollinator biodiversity?',
                options: [
                    'They bloom 365 days a year without sunlight',
                    'They provide the specific nectar, pollen, and host leaf chemistry that indigenous bees, butterflies, and birds have co-evolved to recognize',
                    'They produce artificial chemicals that eliminate all street dust',
                    'They require no soil to grow'
                ],
                correctIndex: 1,
                explanation: 'Native flora share evolutionary relationships with local insect and bird species, offering the precise nutritional nectar, pollen, and nesting structures necessary for their survival.'
            },
            relatedMissionIds: ['m_1'],
            relatedEcoLensIds: ['dec_22'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_9',
            category: 'Sustainable Transportation',
            title: 'Active Mobility, Public Transit & Decarbonized Commutes',
            shortDescription: 'Explore urban commute footprints, micro-mobility options, and the benefits of multimodal public transit.',
            whyItMatters: 'The transport sector accounts for roughly 25% of global energy-related greenhouse gas emissions. Single-occupancy passenger cars are the largest contributor to urban air congestion and toxic particulate matter (PM2.5).',
            keyPoints: [
                'Replacing short car or scooter trips (under 2 km) with walking or bicycling produces zero tailpipe emissions and improves cardiovascular health.',
                'Taking electric metro trains or shared buses produces up to 75% fewer carbon emissions per passenger-kilometer than personal vehicles.',
                'Carpooling and consolidating weekly errands into single linked trips halves household fuel usage.',
                'Proper tire inflation and smooth driving habits improve vehicle fuel efficiency by 5-10%.'
            ],
            everydayExamples: [
                'Choosing to walk or cycle for neighborhood grocery runs and bakery visits.',
                'Utilizing metro rails and bus rapid transit for daily college and office commutes.',
                'Carpooling with classmates or colleagues who share overlapping commute routes.'
            ],
            tips: [
                'Set a personal goal to make at least 2 days a week completely car-free or personal vehicle-free.',
                'Plan trips during off-peak hours to avoid idling in heavy traffic jams.'
            ],
            estimatedTime: '5 mins',
            difficulty: 'Beginner',
            xpReward: 25,
            knowledgeCheck: {
                question: 'What percentage reduction in per-passenger carbon emissions is typically achieved by riding electric metro rail over driving alone in a car?',
                options: [
                    '0% (they emit the same)',
                    'Roughly 10%',
                    'Up to 75% or more',
                    'Less than 5%'
                ],
                correctIndex: 2,
                explanation: 'Mass transit achieves massive energy efficiency per passenger-kilometer, cutting carbon emissions by up to 75% compared to single-occupant motor vehicles.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_17'],
            relatedProjectId: 'proj_3'
        },
        {
            id: 'top_10',
            category: 'Energy & Climate',
            title: 'Renewable Energy Transition & Rooftop Solar',
            shortDescription: 'Understand solar photovoltaics, wind energy integration, and decentralized clean energy grids.',
            whyItMatters: 'Transitioning from coal and natural gas power plants to renewable solar and wind is the most critical pillar in keeping global warming under the 1.5°C Paris Agreement threshold.',
            keyPoints: [
                'Solar photovoltaic panels convert photons from sunlight directly into clean DC electricity with zero operational emissions.',
                'Rooftop solar systems pay back their embodied manufacturing energy within 1.5 to 2.5 years of continuous operation.',
                'Net metering allows residential solar owners to export surplus daytime power back to the municipal grid for billing credits.',
                'Decentralized community microgrids enhance energy resilience during severe extreme weather events.'
            ],
            everydayExamples: [
                'Installing solar water heaters on residential terraces to replace high-wattage electric geysers.',
                'Using solar-powered garden path lights and portable solar phone chargers during travel.',
                'Advocating for campus and apartment society rooftop solar panel installations.'
            ],
            tips: [
                'Keep rooftop solar panels free of dust and bird droppings to maintain peak photovoltaic efficiency.',
                'Shift heavy electricity usage (laundry washing, water pumping) to midday peak solar hours.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Intermediate',
            xpReward: 35,
            knowledgeCheck: {
                question: 'What is net metering in residential rooftop solar systems?',
                options: [
                    'A penalty fee charged for using solar energy',
                    'A billing mechanism that credits solar system owners for the excess electricity they feed back into the power grid',
                    'A filter that turns solar power into water',
                    'A device that shuts down panels during cloudy days'
                ],
                correctIndex: 1,
                explanation: 'Net metering tracks both power drawn from the grid and excess solar electricity exported to the grid, crediting the customer on their monthly electricity bill.'
            },
            relatedMissionIds: ['m_2', 'm_6'],
            relatedEcoLensIds: ['dec_15'],
            relatedProjectId: 'proj_4'
        },
        {
            id: 'top_11',
            category: 'Climate Awareness',
            title: 'Carbon Footprints & Climate Science Fundamentals',
            shortDescription: 'Deconstruct Scope 1, 2, and 3 emissions, climate tipping points, and high-impact personal climate action.',
            whyItMatters: 'Human activities have increased atmospheric carbon dioxide concentrations by over 50% since pre-industrial times, driving rising sea levels, severe droughts, and intensified tropical storms.',
            keyPoints: [
                'A carbon footprint measures the total greenhouse gas emissions (CO2, CH4, N2O) caused directly and indirectly by an individual, organization, or product.',
                'Scope 1 refers to direct emissions (e.g. burning petrol in your car); Scope 2 is purchased electricity; Scope 3 includes all supply chain and lifecycle emissions of items you buy.',
                'Plant-rich diets, reduced air travel, energy efficiency, and waste reduction represent the highest-leverage lifestyle actions.',
                'Climate adaptation involves building resilience to climate impacts, while mitigation focuses on halting emissions at the source.'
            ],
            everydayExamples: [
                'Calculating your household footprint using verified carbon calculators.',
                'Opting for train travel over domestic flights for medium-distance journeys.',
                'Eating vegetarian or plant-forward meals several days a week.'
            ],
            tips: [
                'Focus on structural reductions (efficiency, transport, diet) rather than relying solely on carbon offsets.',
                'Engage in community advocacy to encourage institutional renewable energy transitions.'
            ],
            estimatedTime: '8 mins',
            difficulty: 'Intermediate',
            xpReward: 35,
            knowledgeCheck: {
                question: 'Which of the following falls under Scope 3 indirect carbon emissions for an individual?',
                options: [
                    'The emissions released by the factory and freight ships that manufactured and delivered your new laptop',
                    'The petrol burned inside your own scooter engine while driving',
                    'The natural gas burned in your home kitchen stove',
                    'There is no such thing as Scope 3 emissions'
                ],
                correctIndex: 0,
                explanation: 'Scope 3 encompasses all indirect upstream and downstream supply chain emissions, including the extraction of raw materials, manufacturing, and transport of goods you purchase.'
            },
            relatedMissionIds: ['m_4'],
            relatedEcoLensIds: ['dec_17'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_12',
            category: 'Water Conservation',
            title: 'Rainwater Harvesting & Groundwater Recharge',
            shortDescription: 'Capture clean precipitation, prevent urban flooding, and replenish depleted subterranean aquifers.',
            whyItMatters: 'Rapid urban paving with concrete prevents rainwater from naturally infiltrating the soil, leading to falling groundwater tables and severe urban flash floods during monsoons.',
            keyPoints: [
                'Rooftop rainwater harvesting channels clean roof runoff through first-flush diverters into storage tanks or recharge wells.',
                'Harvested rainwater is naturally soft, free of salts and chlorine, making it ideal for gardening, washing, and groundwater recharge.',
                'Recharge pits filter rainwater through sand, gravel, and charcoal layers before injecting it into underground aquifers.',
                'Permeable paving and rain gardens allow urban soil to act as natural sponges.'
            ],
            everydayExamples: [
                'Placing rain barrels beneath rooftop downspouts to capture water for balcony plants.',
                'Creating a swale or gravel rain garden in apartment courtyards to absorb excess storm runoff.',
                'Cleaning rooftop surfaces and gutters prior to the arrival of monsoon rains.'
            ],
            tips: [
                'Always include a simple mesh filter and first-flush bypass to discard the initial dusty minutes of rain.',
                'Cover all stored rainwater containers tightly to prevent mosquito breeding.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'What is the purpose of a "first-flush diverter" in a rooftop rainwater harvesting system?',
                options: [
                    'To add pleasant fragrance to the harvested rainwater',
                    'To automatically discard the first few minutes of rain runoff that carries atmospheric dust, bird droppings, and roof debris',
                    'To pump rainwater into city water mains for sale',
                    'To warm up the water before it enters the tank'
                ],
                correctIndex: 1,
                explanation: 'The initial rainfall washes away accumulated roof dust, leaves, and contaminants. Diverting this first flush ensures that only clean subsequent water enters your storage tank.'
            },
            relatedMissionIds: ['m_1'],
            relatedEcoLensIds: ['dec_14'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_13',
            category: 'Green Homes & Living',
            title: 'Non-Toxic Green Cleaning & Indoor Air Quality',
            shortDescription: 'Replace harsh synthetic cleaners with vinegar and baking soda, and filter indoor volatile organic compounds (VOCs).',
            whyItMatters: 'Indoor air can be 2 to 5 times more polluted than outdoor air due to synthetic aerosol sprays, chemical air fresheners, and harsh chlorine/ammonia cleaning agents that release toxic VOCs.',
            keyPoints: [
                'White vinegar (mild acetic acid) dissolves mineral scale, water stains, and soap scum naturally.',
                'Baking soda (sodium bicarbonate) acts as a gentle abrasive and neutralizes stubborn odors without synthetic perfumes.',
                'Common indoor houseplants like Snake Plants and Spider Plants absorb trace formaldehyde and benzene while releasing oxygen.',
                'Never mix chlorine bleach with ammonia or vinegar, as it produces lethal chloramine and chlorine gas.'
            ],
            everydayExamples: [
                'Making an all-purpose surface spray using equal parts water, white vinegar, and citrus peel infusions.',
                'Sprinkling baking soda on mattresses or carpets before vacuuming to neutralize odors naturally.',
                'Opening opposite windows for 15 minutes every morning to purge indoor stale air and CO2 build-up.'
            ],
            tips: [
                'Avoid aerosol synthetic room fresheners; use dried cloves, cinnamon sticks, or natural essential oils instead.',
                'Keep at least 2-3 air-purifying houseplants in bedrooms and study spaces.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why is it extremely hazardous to mix chlorine bleach with acidic cleaners like vinegar or ammonia?',
                options: [
                    'It turns the liquid into drinking water',
                    'It reacts chemically to produce toxic, suffocating chlorine or chloramine gas',
                    'It permanently ruins the mop stick',
                    'The mixture simply loses its cleaning power with no danger'
                ],
                correctIndex: 1,
                explanation: 'Combining bleach with acids or ammonia triggers a violent chemical reaction releasing toxic chlorine or chloramine gas, which causes severe respiratory damage.'
            },
            relatedMissionIds: ['m_1'],
            relatedEcoLensIds: ['dec_20'],
            relatedProjectId: 'proj_4'
        },
        {
            id: 'top_14',
            category: 'Food & Organic Living',
            title: 'Plant-Forward Diets & Virtual Resource Footprints',
            shortDescription: 'Explore the resource intensity of livestock agriculture and the immense ecological benefits of plant-centric eating.',
            whyItMatters: 'Animal agriculture occupies 80% of global agricultural land while providing only 18% of global calories. Shifting toward plant-forward meals is one of the single most effective ways to slash personal land and water footprints.',
            keyPoints: [
                'Producing 1 kg of beef requires over 15,000 litres of water and generates 60 kg of greenhouse gases, compared to just 1,000 litres for 1 kg of pulses or grains.',
                'Livestock feed production (soy and corn) is the leading driver of tropical deforestation in the Amazon basin.',
                'Eating locally and seasonally reduces cold-storage electricity and long-distance air freight emissions.',
                'Adopting "Meatless Mondays" or plant-based meals several days a week significantly improves personal health markers.'
            ],
            everydayExamples: [
                'Replacing dairy milk with locally grown oat, soy, or almond alternatives.',
                'Basing weekday meals around lentils, chickpeas, tofu, seasonal greens, and whole grains.',
                'Shopping at neighborhood farmer markets for in-season local produce.'
            ],
            tips: [
                'Experiment with flavorful plant proteins like legumes, edamame, paneer/tofu, and tempeh.',
                'Check ingredient labels to avoid products containing untraceable, non-sustainable palm oil.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Approximately how much water is embedded in the production of 1 kg of industrial beef compared to 1 kg of pulses/grains?',
                options: [
                    'The same amount (about 500 litres)',
                    'Roughly 15,000 litres for beef versus ~1,000-2,000 litres for pulses',
                    'Beef requires zero water',
                    'Pulses require 50,000 litres'
                ],
                correctIndex: 1,
                explanation: 'Beef has an extraordinarily high virtual water footprint (~15,400 L/kg) due to the immense volumes of water required to irrigate cattle feed crops over the animal’s lifespan.'
            },
            relatedMissionIds: ['m_8'],
            relatedEcoLensIds: ['dec_12'],
            relatedProjectId: 'proj_5'
        },
        {
            id: 'top_15',
            category: 'Sustainable Consumption',
            title: 'The 6 Rs Hierarchy & Mindful Consumerism',
            shortDescription: 'Move beyond basic recycling to Refuse, Reduce, Reuse, Repair, Repurpose, and Rot before buying new.',
            whyItMatters: 'Recycling is the last line of defense, not the first. Recycling consumes significant energy, transport, and water. Preventing waste at the point of purchase eliminates resource extraction entirely.',
            keyPoints: [
                'Refuse: Saying no to unnecessary freebies, promotional junk, and disposable items.',
                'Reduce: Buying only what is genuinely needed and choosing durable, repairable quality over fast disposable goods.',
                'Reuse & Repair: Mending broken items, swapping with community members, and restoring old furniture.',
                'Rot: Composting organic biological matter back into healthy soil rather than sending it to landfills.'
            ],
            everydayExamples: [
                'Declining promotional plastic pens, flyers, and synthetic corporate goodie bags at conferences.',
                'Borrowing or renting specialty tools (drills, ladders) instead of purchasing items used once a year.',
                'Repairing a loose headphone wire or phone screen instead of discarding the entire gadget.'
            ],
            tips: [
                'Implement a "30-Day Rule" for non-essential purchases to curb impulse spending.',
                'Support local shoe repairers, tailors, and electronics repair shops.'
            ],
            estimatedTime: '5 mins',
            difficulty: 'Beginner',
            xpReward: 25,
            knowledgeCheck: {
                question: 'In the 6 Rs waste hierarchy, which action has the highest positive environmental priority?',
                options: [
                    'Recycling materials at an industrial processing plant',
                    'Refusing unnecessary packaging and products at the source before they enter your home',
                    'Incinerating items in a waste-to-energy plant',
                    'Burying plastic waste in deep trenches'
                ],
                correctIndex: 1,
                explanation: 'Refusing eliminates the need for raw material extraction, manufacturing, packaging, transport, and recycling energy entirely, making it the most powerful tier in circularity.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_1', 'dec_5'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_16',
            category: 'Plastics & Oceans',
            title: 'Ocean Acidification & Coral Reef Conservation',
            shortDescription: 'Understand how excess atmospheric CO2 alters ocean chemistry, dissolves calcium shells, and bleaches coral reefs.',
            whyItMatters: 'Oceans have absorbed over 30% of all anthropogenic carbon dioxide emissions, causing ocean surface pH to drop by 0.1 units—representing a 30% increase in acidity that threatens marine calcifiers.',
            keyPoints: [
                'As carbon dioxide dissolves in seawater, it forms carbonic acid (H2CO3), depleting carbonate ions needed for shells.',
                'Oysters, clams, sea snails, and coral skeletons struggle to build and maintain their calcium carbonate structures in acidic waters.',
                'Coral reefs support over 25% of all marine life despite covering less than 0.1% of the ocean floor.',
                'Reef-safe sunscreens avoid oxybenzone and octinoxate, chemicals proven to induce coral bleaching even at minute concentrations.'
            ],
            everydayExamples: [
                'Using mineral-based (non-nano zinc oxide) reef-safe sunscreens when swimming in coastal waters.',
                'Supporting marine protected areas and sustainable seafood certification standards (MSC certified).',
                'Reducing personal carbon emissions to slow ocean heat absorption and acidification rates.'
            ],
            tips: [
                'Check sunscreen ingredients for chemical filters that harm coral ecosystems.',
                'Avoid purchasing jewelry or decorative souvenirs made from real sea shells or dried coral.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Advanced',
            xpReward: 35,
            knowledgeCheck: {
                question: 'What chemical process occurs when oceans absorb excess atmospheric carbon dioxide?',
                options: [
                    'The water turns into pure liquid petroleum',
                    'It forms carbonic acid, reducing ocean pH and depleting carbonate ions needed by shell-forming organisms and corals',
                    'It causes the ocean to boil instantly',
                    'It produces excess solid rock that fills ocean trenches'
                ],
                correctIndex: 1,
                explanation: 'CO2 reacts with seawater to form carbonic acid, which lowers pH (ocean acidification) and binds with carbonate ions, starving corals and shellfish of the building blocks needed for their skeletons.'
            },
            relatedMissionIds: ['m_4'],
            relatedEcoLensIds: ['dec_4'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_17',
            category: 'Waste & Circularity',
            title: 'Hazardous Waste, Solvents & Battery Chemistry',
            shortDescription: 'Safely handle expired medicines, aerosol cans, leftover paints, and chemical solvents at home.',
            whyItMatters: 'Household hazardous wastes poured down the drain or thrown in general bins corrode sewage pipes, disrupt wastewater treatment bacteria, and poison surface rivers with non-biodegradable toxins.',
            keyPoints: [
                'Never pour paint thinners, engine oil, or expired liquid medicines down household sinks or toilets.',
                'Expired pharmaceuticals flushed down toilets bypass standard municipal wastewater filters and contaminate aquatic fish populations with endocrine disruptors.',
                'Used cooking oil poured down sinks solidifies into massive underground sewer "fatbergs".',
                'Aerosol cans under pressure can explode violently if crushed in waste compactor trucks.'
            ],
            everydayExamples: [
                'Collecting used cooking oil in a glass jar for bio-diesel recycling or mixing with sawdust for safe solid disposal.',
                'Dropping expired medicines at pharmacy return kiosks rather than flushing them down toilets.',
                'Allowing leftover water-based paint cans to dry completely with the lid off before disposal.'
            ],
            tips: [
                'Keep hazardous household chemicals in their original labeled containers.',
                'Tape 9V battery terminals to prevent spontaneous short-circuit spark fires.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 35,
            knowledgeCheck: {
                question: 'Why should expired prescription medications never be flushed down toilets or poured into sinks?',
                options: [
                    'They will permanently dye city pipes bright yellow',
                    'They pass through sewage treatment plants into rivers and oceans, contaminating aquatic life with active chemicals and antibiotics',
                    'They immediately evaporate into storm clouds',
                    'There is no issue; sewage plants filter all medicines completely'
                ],
                correctIndex: 1,
                explanation: 'Standard municipal sewage treatment facilities cannot degrade complex pharmaceutical molecules, which enter aquatic ecosystems and disrupt fish hormone systems and foster antibiotic-resistant bacteria.'
            },
            relatedMissionIds: ['m_5'],
            relatedEcoLensIds: ['dec_6', 'dec_13', 'dec_14', 'dec_20'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_18',
            category: 'Green Homes & Living',
            title: 'Passive Solar Architecture & Thermal Comfort',
            shortDescription: 'Utilize building orientation, window shading, thermal mass, and cool roofs to stay comfortable without heavy AC.',
            whyItMatters: 'Space cooling and heating account for over 40% of building energy use worldwide. Passive design harnesses natural airflow and solar geometry to maintain comfortable indoor temperatures with minimal grid electricity.',
            keyPoints: [
                'External window overhangs (chajjas/eaves) block high summer midday sun while allowing low winter morning light.',
                'Painting roofs with high-albedo reflective white paint (cool roofs) reduces rooftop heat absorption by up to 30°C.',
                'Cross-ventilation requires placing openings on opposite walls to allow wind pressure differentials to circulate air.',
                'Dense materials like terracotta, brick, and stone provide thermal mass, slowing daytime heat transfer.'
            ],
            everydayExamples: [
                'Drawing reflective curtains or bamboo blinds on south- and west-facing windows during peak afternoon heat.',
                'Opening windows on opposite sides of your residence during cool evenings to flush out warm air.',
                'Placing dense leafy potted plants on sun-baked balconies to provide natural evaporative cooling.'
            ],
            tips: [
                'Apply reflective solar window film on west-facing glass panes.',
                'Use ceiling fans alongside moderate AC settings (25°C) to create a wind-chill effect that feels like 22°C.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'How does a "cool roof" with high solar reflectance benefit indoor thermal comfort and the city?',
                options: [
                    'It generates artificial snow on top of the house',
                    'It reflects solar radiation back into space rather than absorbing heat into the building, lowering indoor temperatures and cutting urban heat island effects',
                    'It absorbs all sunlight to heat the attic',
                    'It requires continuous water spraying to function'
                ],
                correctIndex: 1,
                explanation: 'High-albedo reflective coatings reflect up to 80% of sunlight, preventing rooftop heat penetration, lowering indoor air temperatures by 2-5°C, and reducing cooling electricity loads.'
            },
            relatedMissionIds: ['m_6'],
            relatedEcoLensIds: ['dec_15'],
            relatedProjectId: 'proj_6'
        },
        {
            id: 'top_19',
            category: 'Biodiversity & Nature',
            title: 'Deforestation, Soil Degradation & Reforestation',
            shortDescription: 'Understand topsoil loss, the carbon storage power of mature forests, and community-led tree stewardship.',
            whyItMatters: 'The Earth loses over 10 million hectares of forest every year. Forests are Earth’s primary terrestrial carbon sinks and home to 80% of terrestrial biodiversity; healthy topsoil takes 500+ years to generate just 1 inch.',
            keyPoints: [
                'Tree root networks bind soil particles together, preventing landslides, river siltation, and catastrophic erosion during downpours.',
                'Mature primary forests sequester significantly more carbon and harbor deeper biodiversity than monoculture timber plantations.',
                'Soil organic matter stores 3x more carbon than all vegetation on Earth combined.',
                'Agroforestry combines trees with agricultural crops, restoring degraded farmland and enhancing water retention.'
            ],
            everydayExamples: [
                'Participating in local indigenous tree planting and sapling aftercare drives.',
                'Using recycled post-consumer paper products and FSC-certified sustainably sourced wood products.',
                'Composting organic matter to replenish essential microbial carbon in household garden soils.'
            ],
            tips: [
                'When planting trees, prioritize indigenous native varieties over fast-growing invasive eucalyptus or acacia.',
                'Always ensure an ongoing water and protection plan for saplings for at least 2 full years.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why are native, multi-species reforestation projects vastly superior to single-species monoculture plantations?',
                options: [
                    'Single-species plantations grow forever without soil',
                    'Multi-species native forests create resilient ecological food webs, resist disease outbreaks, and support deep biodiversity',
                    'Monoculture trees do not produce oxygen',
                    'Multi-species trees require chemical pesticides'
                ],
                correctIndex: 1,
                explanation: 'Diverse native forests mimic natural ecosystems with complex canopy layers and root depths, resisting pest epidemics and providing specialized habitat for wildlife.'
            },
            relatedMissionIds: ['m_1'],
            relatedEcoLensIds: ['dec_5', 'dec_22'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_20',
            category: 'Sustainable Consumption',
            title: 'Packaging Waste & Zero-Waste Grocery Shopping',
            shortDescription: 'Audit grocery plastic, buy in bulk, support refill stations, and eliminate excessive outer packaging.',
            whyItMatters: 'Packaging represents nearly 40% of all plastic production and 50% of global paper usage. Most multi-layer food packaging (plastic + foil laminates) is impossible to recycle in standard municipal facilities.',
            keyPoints: [
                'Multi-layer packaging (like chip bags and snack wrappers) fuses aluminum foil with plastic films, making mechanical recycling economically unviable.',
                'Buying staple dry goods (rice, lentils, oats, nuts) in bulk reduces packaging-to-product ratios by over 80%.',
                'Refillable glass and metal containers eliminate recurring disposable bottle purchases.',
                'Carrying cotton mesh bags for loose produce prevents collecting dozens of thin plastic film bags.'
            ],
            everydayExamples: [
                'Bringing reusable cloth bags and glass containers to bulk grocery markets and grain stores.',
                'Choosing loose eggs in cardboard trays rather than plastic-wrapped styrofoam cartons.',
                'Opting for concentrated cleaning tablets or refill stations instead of buying single-use bottled cleaners.'
            ],
            tips: [
                'Keep 2-3 cotton produce bags inside your main grocery tote bag so you are never caught unprepared.',
                'Choose products packaged in infinitely recyclable materials like glass and metal over multi-layer pouches.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Beginner',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why are shiny snack chip bags and instant noodle pouches rarely recycled by municipal systems?',
                options: [
                    'They are made of pure gold',
                    'They consist of multi-material laminate layers (plastic fused with aluminum) that cannot be easily separated mechanically',
                    'Recycling centers are afraid of snack salt',
                    'They biodegrade naturally in 24 hours'
                ],
                correctIndex: 1,
                explanation: 'Multi-layer composite films bond different polymer layers with metal foils, creating a material that cannot be easily melted down or separated with standard recycling equipment.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_4', 'dec_10', 'dec_19'],
            relatedProjectId: 'proj_3'
        },
        {
            id: 'top_21',
            category: 'Climate Awareness',
            title: 'Urban Heat Islands & Microclimate Modification',
            shortDescription: 'Analyze why cities are 3-7°C hotter than rural surroundings, and how urban greenery mitigates heat.',
            whyItMatters: 'Asphalt roads, concrete towers, and vehicle engines absorb and trap solar heat, creating Urban Heat Islands (UHI) that spike nighttime temperatures, worsen heat-related illnesses, and drive massive AC power consumption.',
            keyPoints: [
                'Dark asphalt absorbs up to 95% of solar radiation, radiating heat back into urban air long after sunset.',
                'Trees and vegetation provide natural shading and cool air through evapotranspiration—acting as natural air conditioners.',
                'Green roofs and vertical living walls reduce building wall temperatures by up to 10°C.',
                'Permeable pavements allow rainwater to soak into the ground, cooling the surface as moisture evaporates.'
            ],
            everydayExamples: [
                'Growing climbing vines or vertical green walls on sun-exposed exterior balcony walls.',
                'Advocating for permeable grass paver blocks in residential parking lots instead of solid asphalt.',
                'Supporting municipal street tree planting initiatives along pedestrian sidewalks.'
            ],
            tips: [
                'Plant leafy shade trees on the south and west sides of homes to block aggressive afternoon sun.',
                'Choose light-colored paving tiles for terraces and open courtyards.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'What primary physical mechanism allows urban street trees and parks to cool surrounding air temperatures?',
                options: [
                    'They pump cold groundwater directly onto the road surface',
                    'Evapotranspiration (releasing water vapor through leaves) combined with direct physical solar shading',
                    'They emit cool synthetic gases into the atmosphere',
                    'Trees reflect 100% of all sound waves'
                ],
                correctIndex: 1,
                explanation: 'Trees cool urban microclimates through physical canopy shading (blocking pavement solar absorption) and evapotranspiration (water evaporating from leaf stomata absorbs ambient heat).'
            },
            relatedMissionIds: ['m_6'],
            relatedEcoLensIds: ['dec_15'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_22',
            category: 'E-Waste & Technology',
            title: 'Digital Carbon Declutter & Cloud Server Footprints',
            shortDescription: 'Understand the hidden electricity behind cloud data centers, cold storage, and streaming bandwidth.',
            whyItMatters: 'The global digital information ecosystem accounts for roughly 3.7% of global greenhouse emissions—more than the commercial aviation industry. Every stored file, duplicate photo, and unread newsletter requires continuous server power and cooling.',
            keyPoints: [
                'Data servers require 24/7 electricity to maintain redundancy and power massive chilled-water cooling towers.',
                'Transmitting high-definition video over 4G/5G mobile networks consumes significantly more energy than local Wi-Fi or cached storage.',
                'Unsubscribing from 50 obsolete marketing emails prevents continuous automated server queries and storage allocation.',
                'Cleaning out duplicate cloud backups and cold archive files frees up valuable server space.'
            ],
            everydayExamples: [
                'Periodically deleting fuzzy duplicate photos, screen recordings, and temporary downloads.',
                'Unsubscribing from promotional newsletter subscriptions you never read.',
                'Lowering default video streaming resolution when listening primarily for background audio.'
            ],
            tips: [
                'Empty your email "Trash" and "Spam" folders permanently once every month.',
                'Store files locally on external hard drives rather than continuously paying for expanding cloud tiers.'
            ],
            estimatedTime: '5 mins',
            difficulty: 'Beginner',
            xpReward: 25,
            knowledgeCheck: {
                question: 'Why does hoarding thousands of unread promotional emails and duplicate cloud photos consume real-world electricity?',
                options: [
                    'The files create magnetic weight that slows down internet cables',
                    'Data centers must keep millions of hard drive platters spinning and run continuous refrigerated cooling systems to store data 24/7',
                    'Every unread email drains your personal laptop battery by 1% daily',
                    'Cloud data is stored in outer space with zero energy required'
                ],
                correctIndex: 1,
                explanation: 'Cloud storage is anchored in massive physical data center buildings requiring uninterrupted electricity, backup diesel generators, and continuous industrial cooling to keep servers online 24/7.'
            },
            relatedMissionIds: ['m_4'],
            relatedEcoLensIds: ['dec_2'],
            relatedProjectId: 'proj_1'
        },
        {
            id: 'top_23',
            category: 'Water Conservation',
            title: 'Greywater Recycling & Household Water Loops',
            shortDescription: 'Safely divert washing machine and shower water to nourish non-edible gardens and flush toilets.',
            whyItMatters: 'Greywater (gently used water from washing machines, showers, and washbasins) makes up 50-70% of residential wastewater. Reusing greywater cuts household freshwater demand in half and reduces strain on municipal sewage plants.',
            keyPoints: [
                'Greywater is distinct from blackwater (toilet sewage) and contains trace soap, lint, and hairs that can be easily filtered.',
                'Simple gravity-fed sand and gravel filters purify greywater for immediate garden irrigation.',
                'Eco-friendly, plant-based, phosphate-free detergents ensure greywater is safe for ornamental plants.',
                'Greywater must never be stored for more than 24 hours, as bacteria multiply rapidly in stagnant warm water.'
            ],
            everydayExamples: [
                'Diverting the final rinse cycle water from your washing machine into buckets for floor mopping.',
                'Placing a basin in the bathroom sink to catch hand-washing water for toilet flushing.',
                'Using plant-safe biodegradable soaps so shower runoff can feed garden flowerbeds.'
            ],
            tips: [
                'Use greywater only on ornamental garden beds and tree roots; avoid spraying directly on leafy salad greens.',
                'Always use greywater within 24 hours of collection to avoid bacterial odors.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'What is the crucial rule regarding storing untreated greywater collected from household showers and washing machines?',
                options: [
                    'It can be stored in sealed drums for several years',
                    'It must be used within 24 hours to prevent stagnant bacteria and anaerobic odors from multiplying',
                    'It should be boiled and used for cooking soup',
                    'It must be mixed with synthetic bleach before touching garden soil'
                ],
                correctIndex: 1,
                explanation: 'Untreated greywater contains organic soap residues and dead skin cells. If left standing for over 24 hours, bacteria rapidly consume the oxygen, turning the water into foul anaerobic blackwater.'
            },
            relatedMissionIds: ['m_7'],
            relatedEcoLensIds: ['dec_14'],
            relatedProjectId: 'proj_2'
        },
        {
            id: 'top_24',
            category: 'Sustainable Fashion',
            title: 'Fast Fashion Impacts & Ethical Textile Literacy',
            shortDescription: 'Analyze the environmental cost of rapid trend cycles, synthetic microfibers, and toxic textile dyeing.',
            whyItMatters: 'Global clothing consumption has doubled in the last 15 years, while garment utilization has dropped by 36%. Fast fashion relies on cheap petrochemical synthetic fabrics and toxic untreated dye discharge into developing nation rivers.',
            keyPoints: [
                'Producing a single new cotton t-shirt requires over 2,700 litres of clean water—enough drinking water for one person for 2.5 years.',
                'Textile dyeing is the world’s second-largest polluter of water, discharging toxic heavy metals and carcinogens into rivers.',
                'Synthetic fabrics (polyester, nylon, acrylic) are essentially woven fossil fuels that will never safely biodegrade.',
                'Investing in high-quality timeless garments, mending worn seams, and thrifting keeps textiles out of landfills.'
            ],
            everydayExamples: [
                'Committing to a "No New Clothes for 3 Months" wardrobe challenge.',
                'Checking garment tags before buying to prioritize 100% natural, biodegradable single-fiber fabrics.',
                'Visiting local thrift shops, vintage stores, or participating in clothing swap parties.'
            ],
            tips: [
                'Learn basic hand-sewing skills to reattach buttons and fix small torn seams.',
                'Avoid impulse shopping triggered by ultra-fast fashion social media hauls and flash sales.'
            ],
            estimatedTime: '7 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'Why are garments made of mixed blended fibers (e.g., 60% cotton + 40% polyester) much harder to recycle than single-material clothes?',
                options: [
                    'They weigh twice as much as pure cotton',
                    'Mechanical and chemical textile recycling machines cannot easily separate tightly interwoven natural and synthetic fibers',
                    'Blended clothes dissolve in washing machines',
                    'Only pure polyester can be dyed'
                ],
                correctIndex: 1,
                explanation: 'Blended fibers bond natural cellulose and synthetic plastic polymers together so tightly that current industrial recycling technologies cannot cost-effectively separate them for fiber recovery.'
            },
            relatedMissionIds: ['m_3'],
            relatedEcoLensIds: ['dec_3', 'dec_16'],
            relatedProjectId: 'proj_3'
        },
        {
            id: 'top_25',
            category: 'Green Homes & Living',
            title: 'Air Pollution, PM2.5 & Personal Clean Air Strategies',
            shortDescription: 'Understand particulate matter sources, indoor air purifiers, HEPA filtration, and local air quality indexes (AQI).',
            whyItMatters: 'Outdoor and indoor air pollution claims over 6.7 million lives annually. Microscopic PM2.5 particles (less than 2.5 micrometers wide) penetrate deep into lung tissue and enter the bloodstream, causing cardiovascular and respiratory illness.',
            keyPoints: [
                'PM2.5 particles originate from vehicular exhaust, crop burning, coal power generation, and construction dust.',
                'True HEPA (High-Efficiency Particulate Air) filters capture 99.97% of airborne particles as small as 0.3 micrometers.',
                'Cooking with unventilated gas stoves produces harmful nitrogen dioxide (NO2) and particulate spikes inside kitchens.',
                'Monitoring daily local AQI helps plan outdoor workouts during lower-pollution morning or afternoon windows.'
            ],
            everydayExamples: [
                'Running kitchen exhaust chimneys or opening windows during high-heat frying or cooking.',
                'Building an affordable DIY Corsi-Rosenthal clean air box using a standard box fan and MERV-13 air filters.',
                'Wearing well-fitted N95 masks when commuting during severe winter smog episodes.'
            ],
            tips: [
                'Avoid burning incense sticks or synthetic scented candles inside closed, unventilated bedrooms.',
                'Check your city AQI before planning long outdoor runs or sports sessions.'
            ],
            estimatedTime: '6 mins',
            difficulty: 'Intermediate',
            xpReward: 30,
            knowledgeCheck: {
                question: 'What makes PM2.5 particulate matter significantly more hazardous to human health than larger dust particles?',
                options: [
                    'PM2.5 particles are radioactive',
                    'They are so microscopic that they bypass upper airway filters, penetrate deep into alveoli lungs, and enter the bloodstream',
                    'They turn all oxygen in the room into carbon monoxide',
                    'They are only found inside refrigerators'
                ],
                correctIndex: 1,
                explanation: 'Due to their ultra-fine size (less than 2.5 microns, 30x smaller than a human hair), PM2.5 particles bypass the nose and throat, penetrating deep into lung alveoli and the vascular bloodstream.'
            },
            relatedMissionIds: ['m_4'],
            relatedEcoLensIds: ['dec_17', 'dec_20'],
            relatedProjectId: 'proj_1'
        }
    ];

    if (typeof window !== 'undefined') {
        window.EcoTopicsData = topics;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = topics;
    }
})();
