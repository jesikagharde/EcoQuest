/**
 * ECOQUEST DATA MODULE: ECOIQ QUESTION POOL
 * 60+ Comprehensive Scenario-Based Assessment Questions across 12 Distinct Categories
 * Used by the dynamic quiz engine to construct Quick Quizzes, Full Assessments, and Category Deep Dives.
 */
(function() {
    const questions = [
        // =====================================================================
        // CATEGORY 1: WASTE & CIRCULAR LIVING (5 Questions)
        // =====================================================================
        {
            id: 'iq_w1',
            category: 'Waste & Circular Living',
            difficulty: 'Easy',
            scenario: 'You finish eating a takeout pizza with friends. The cardboard top lid is completely clean and dry, but the bottom half is soaked in cheese grease and tomato sauce. How should you dispose of the box?',
            options: [
                'Toss the entire box into the clean paper recycling bin',
                'Tear the box in half: put the clean top into paper recycling, and the greasy bottom into wet/compost waste',
                'Soak the greasy bottom in soapy water and then recycle both halves',
                'Put the entire box into the landfill bin'
            ],
            correctIndex: 1,
            explanation: 'Grease and food oils cannot be separated from paper pulp during industrial recycling and spoil entire batches. Tearing the box preserves the clean dry fiber while directing the soiled portion to organic compost.',
            tags: ['cardboard', 'recycling', 'segregation']
        },
        {
            id: 'iq_w2',
            category: 'Waste & Circular Living',
            difficulty: 'Medium',
            scenario: 'You have several empty plastic shampoo bottles and metal soda cans. What is the most effective way to prepare them for municipal dry recyclables?',
            options: [
                'Leave them full of residual liquids to weigh them down in the truck',
                'Rinse out leftover residues with a splash of water, let them dry, and crush cans flat to save space',
                'Melt the plastics together using a household heat gun before disposal',
                'Wrap each bottle individually in plastic cling wrap'
            ],
            correctIndex: 1,
            explanation: 'Rinsing eliminates food or chemical residues that attract pests and spoil nearby paper bales. Compacting items saves massive volume in transport logistics.',
            tags: ['plastics', 'cans', 'recycling']
        },
        {
            id: 'iq_w3',
            category: 'Waste & Circular Living',
            difficulty: 'Advanced',
            scenario: 'Your kitchen compost bin starts emitting an unpleasant, sour rotten egg odor and attracting flies. What is the primary ecological diagnosis and remedy?',
            options: [
                'Spray synthetic chemical air freshener directly into the compost pile',
                'The bin is too wet and oxygen-deprived (anaerobic); mix in dry carbon "browns" like shredded cardboard, dry leaves, and turn it for aeration',
                'Add more fresh fruit peels and leftover cooked curries to speed up decay',
                'Seal the compost airtight in a dark cupboard'
            ],
            correctIndex: 1,
            explanation: 'Unpleasant odors signal anaerobic decomposition due to excess moisture and nitrogen. Adding dry carbon-rich brown materials balances moisture, restores porosity, and allows aerobic bacteria to neutralize smells.',
            tags: ['composting', 'organic', 'troubleshooting']
        },
        {
            id: 'iq_w4',
            category: 'Waste & Circular Living',
            difficulty: 'Easy',
            scenario: 'You receive multiple parcels packed with large white expanded polystyrene (thermocol/styrofoam) blocks. What is the most responsible action?',
            options: [
                'Burn the styrofoam in your backyard firepit to make it disappear',
                'Keep the blocks intact for personal storage cushioning or donate to local packaging and appliance shops for reuse',
                'Throw it directly into the wet kitchen organic waste bin',
                'Flush small broken pieces down the bathroom drain'
            ],
            correctIndex: 1,
            explanation: 'Styrofoam is 95% air and takes up huge landfill space for 500+ years. Burning it releases highly carcinogenic toxic styrene fumes. Reusing intact blocks preserves its protective utility safely.',
            tags: ['styrofoam', 'packaging', 'reuse']
        },
        {
            id: 'iq_w5',
            category: 'Waste & Circular Living',
            difficulty: 'Medium',
            scenario: 'A broken ceramic coffee mug and a shattered window pane cannot be repaired. Can you place them in the curbside glass bottle recycling container?',
            options: [
                'Yes, all glass and ceramic items melt at identical temperatures',
                'No; ceramics, cookware, and window glass have different melting points and chemical additives that ruin bottle glass recycling',
                'Yes, provided they are ground into fine sand first',
                'Only if you paint them green first'
            ],
            correctIndex: 1,
            explanation: 'Window panes, Pyrex, and ceramics melt at much higher temperatures than soda-lime container glass. Mixing them introduces unmelted stones into new bottles, causing fatal structural defects.',
            tags: ['glass', 'ceramics', 'contamination']
        },

        // =====================================================================
        // CATEGORY 2: WATER CONSERVATION (5 Questions)
        // =====================================================================
        {
            id: 'iq_wt1',
            category: 'Water Conservation',
            difficulty: 'Easy',
            scenario: 'You notice your bathroom sink faucet continues dripping at roughly one drop per second. What is the real-world consequence if left unfixed for a year?',
            options: [
                'Less than 10 litres of water will be lost',
                'Over 3,000 litres of treated potable water will be wasted',
                'The pipe will automatically seal itself with mineral deposits within 2 days',
                'It has zero environmental effect because water is infinite'
            ],
            correctIndex: 1,
            explanation: 'At 60 drops per minute, a single leaking tap washer wastes roughly 9 litres daily, accumulating to over 3,000 litres of clean, energy-treated municipal water every year.',
            tags: ['water', 'leaks', 'plumbing']
        },
        {
            id: 'iq_wt2',
            category: 'Water Conservation',
            difficulty: 'Medium',
            scenario: 'You want to reduce your personal household water footprint while washing fresh fruits, vegetables, and rice for dinner. What is the smartest practice?',
            options: [
                'Let the tap run continuously at full blast for 10 minutes over the sink',
                'Wash produce inside a bowl of water, and reuse the collected wash water for nourishing balcony potted plants',
                'Use boiling bottled mineral water and discard it down the sink',
                'Do not wash vegetables at all'
            ],
            correctIndex: 1,
            explanation: 'Washing produce in a dedicated bowl saves up to 15 litres of running tap water, and the nutrient-infused rinse water is completely safe and beneficial for houseplant hydration.',
            tags: ['water', 'kitchen', 'reuse']
        },
        {
            id: 'iq_wt3',
            category: 'Water Conservation',
            difficulty: 'Medium',
            scenario: 'What is the most effective, low-cost modification you can make to existing home taps to cut water consumption without lowering perceived rinsing pressure?',
            options: [
                'Drill larger holes in the faucet spout',
                'Screw on an inexpensive low-flow faucet aerator that mixes tiny air bubbles into the water stream',
                'Keep taps half-broken so water trickles slowly',
                'Remove all water pipes from the building'
            ],
            correctIndex: 1,
            explanation: 'Faucet aerators mix air into the flowing water stream, maintaining high washing pressure and tactile volume while reducing actual water output by 30% to 50%.',
            tags: ['aerator', 'efficiency', 'hardware']
        },
        {
            id: 'iq_wt4',
            category: 'Water Conservation',
            difficulty: 'Advanced',
            scenario: 'You want to implement a simple rooftop rainwater harvesting setup for your apartment terrace. Why is a "first-flush diverter" an essential component?',
            options: [
                'It adds artificial chlorination to the water',
                'It routes the initial dusty, bird-dropping contaminated minutes of rain away so only clean subsequent rainwater enters storage tanks',
                'It cools the water down to 0°C',
                'It pumps rainwater into public street sewers'
            ],
            correctIndex: 1,
            explanation: 'The first rainfall washes away accumulated roof dust, pollen, bird droppings, and soot. Diverting the initial 1-2 mm of rain prevents organic sludge from settling into storage cisterns.',
            tags: ['rainwater', 'harvesting', 'filtration']
        },
        {
            id: 'iq_wt5',
            category: 'Water Conservation',
            difficulty: 'Easy',
            scenario: 'When comparing your morning hygiene routines, which choice conserves the maximum volume of clean water?',
            options: [
                'Taking a 20-minute overhead high-pressure power shower',
                'Using a single bucket bath (~15-18 litres) or a brisk 4-minute shower',
                'Filling a standard bathtub to the brim every morning',
                'Leaving the shower running while applying hair conditioner and shaving'
            ],
            correctIndex: 1,
            explanation: 'High-pressure overhead showerheads discharge 12 to 20 litres every single minute. A bucket bath or 4-minute shower caps total water usage at 15-20 litres total, saving up to 100+ litres per session.',
            tags: ['shower', 'hygiene', 'daily-action']
        },

        // =====================================================================
        // CATEGORY 3: ENERGY & CLIMATE (5 Questions)
        // =====================================================================
        {
            id: 'iq_e1',
            category: 'Energy & Climate',
            difficulty: 'Easy',
            scenario: 'You leave your phone and laptop chargers plugged into the wall outlet 24/7 with the wall switch left in the "ON" position, even when not connected to devices. What occurs?',
            options: [
                'Zero electricity is consumed because the phone is not attached',
                'The internal transformer circuits draw continuous "vampire" standby power, wasting electricity around the clock',
                'The charger generates free electricity back into the power grid',
                'The wall outlet permanently freezes'
            ],
            correctIndex: 1,
            explanation: 'Standby or "vampire" power in idle transformers, displays, and plugged-in chargers consumes continuous baseline power, contributing 5-10% of household electric bills.',
            tags: ['vampire-power', 'electricity', 'chargers']
        },
        {
            id: 'iq_e2',
            category: 'Energy & Climate',
            difficulty: 'Medium',
            scenario: 'On a hot summer afternoon, what is the most energy-efficient thermostat setting for your home air conditioner that maintains comfort while cutting electricity bills?',
            options: [
                '16°C with maximum fan speed',
                '24°C to 25°C accompanied by a low-speed ceiling fan to circulate the cool air',
                'Leaving windows wide open while setting AC to 18°C',
                'Switching the AC on and off every 3 minutes manually'
            ],
            correctIndex: 1,
            explanation: 'Every 1°C increase in AC thermostat setting reduces energy consumption by approximately 6%. Setting the AC to 24-25°C with a ceiling fan creates a comfortable evaporative cooling breeze while slashing power draw by 25-30%.',
            tags: ['air-conditioning', 'cooling', 'efficiency']
        },
        {
            id: 'iq_e3',
            category: 'Energy & Climate',
            difficulty: 'Easy',
            scenario: 'You are upgrading the lighting in your study room and living area. Which bulb technology delivers the highest energy efficiency and longest lifespan?',
            options: [
                'Traditional incandescent filament bulbs',
                'Halogen spotlights',
                'Solid-state LED (Light Emitting Diode) bulbs',
                'Kerosene oil lamps'
            ],
            correctIndex: 2,
            explanation: 'LEDs convert over 80% of energy into light rather than heat, consuming up to 80% less electricity than incandescent bulbs and lasting up to 25,000 operational hours.',
            tags: ['lighting', 'led', 'energy']
        },
        {
            id: 'iq_e4',
            category: 'Energy & Climate',
            difficulty: 'Advanced',
            scenario: 'What is the primary difference between residential rooftop solar with "Net Metering" versus an off-grid battery solar system?',
            options: [
                'Net metering charges double for solar power',
                'Net metering feeds surplus daytime solar power back into the utility grid for electricity bill credits, eliminating the need for expensive chemical battery banks',
                'Off-grid systems only work when it rains',
                'Net metering converts sunlight into natural gas'
            ],
            correctIndex: 1,
            explanation: 'Net-metered systems use the municipal grid as a virtual battery, exporting excess peak midday solar energy to offset electricity drawn from the grid during the night.',
            tags: ['solar', 'net-metering', 'renewables']
        },
        {
            id: 'iq_e5',
            category: 'Energy & Climate',
            difficulty: 'Medium',
            scenario: 'How does applying high-albedo reflective white paint (a "Cool Roof") to a building terrace affect indoor thermal comfort and the surrounding neighborhood?',
            options: [
                'It attracts winter frost to the building',
                'It reflects up to 80% of solar radiation back into space, lowering top-floor indoor temperatures by 2-5°C and reducing local urban heat island effects',
                'It generates electricity directly through the paint',
                'It increases AC power demand by absorbing dark rays'
            ],
            correctIndex: 1,
            explanation: 'Cool roofs prevent the concrete roof slab from acting as a massive thermal radiator, decreasing heat transfer into top-floor rooms and cutting cooling electricity needs.',
            tags: ['cool-roof', 'passive-cooling', 'architecture']
        },

        // =====================================================================
        // CATEGORY 4: FOOD & SUSTAINABLE EATING (5 Questions)
        // =====================================================================
        {
            id: 'iq_f1',
            category: 'Food & Sustainable Eating',
            difficulty: 'Easy',
            scenario: 'Why is discarding food waste into municipal landfills considered a major driver of global climate change?',
            options: [
                'Food turns into radioactive rocks in dumps',
                'When buried under heavy trash without oxygen, organic matter decomposes anaerobically to produce methane (CH4), a greenhouse gas 28x more potent than CO2',
                'Food scraps attract clouds that block all rainfall',
                'Food waste has no connection to greenhouse gases'
            ],
            correctIndex: 1,
            explanation: 'Landfills lack oxygen. Under anaerobic conditions, bacteria break down organic scraps into potent methane gas, driving accelerated atmospheric warming.',
            tags: ['food-waste', 'methane', 'landfills']
        },
        {
            id: 'iq_f2',
            category: 'Food & Sustainable Eating',
            difficulty: 'Medium',
            scenario: 'You have a bunch of carrots and coriander stems in your refrigerator that are starting to look slightly limp and wilted, but have no mold or rot. What should you do?',
            options: [
                'Immediately throw them into the general waste bin',
                'Revive them by placing their stems in a bowl of ice-cold water, or chop and freeze them for vegetable broth/curry bases',
                'Microwave them on high heat for 30 minutes',
                'Paint them with food coloring'
            ],
            correctIndex: 1,
            explanation: 'Limpness in greens is simply dehydration of plant cell walls. Rehydrating in cold water restores crispness, while simmering into broths rescues flavor and nutrition entirely.',
            tags: ['food-rescue', 'kitchen', 'cooking']
        },
        {
            id: 'iq_f3',
            category: 'Food & Sustainable Eating',
            difficulty: 'Medium',
            scenario: 'How does adopting a plant-forward or flexitarian diet several days a week significantly lower a person’s virtual environmental footprint?',
            options: [
                'Plant foods require zero soil to grow',
                'Livestock farming requires vastly more land, feed crops, and virtual water (~15,000 L/kg for beef vs ~1,500 L/kg for pulses), while producing significant enteric methane',
                'Eating plants permanently removes all carbon from Earth',
                'Plants do not produce any organic waste'
            ],
            correctIndex: 1,
            explanation: 'Animals consume multiple times more calories in feed crops than they yield in meat. Shifting calories toward legumes and grains drastically reduces land clearing, deforestation, and water consumption.',
            tags: ['plant-forward', 'virtual-water', 'footprint']
        },
        {
            id: 'iq_f4',
            category: 'Food & Sustainable Eating',
            difficulty: 'Easy',
            scenario: 'What is the smartest refrigerator organization strategy to prevent food spoilage and grocery waste at home?',
            options: [
                'Shove new groceries in front of older items so older items are pushed out of sight',
                'Practice "FIFO" (First In, First Out) and create a designated "Eat This First" container for items nearing expiration',
                'Keep the refrigerator unplugged on alternate days',
                'Store raw meat directly on top of unwrapped fresh strawberries'
            ],
            correctIndex: 1,
            explanation: 'Visible pantry organization and a "Eat This First" priority zone ensure perishables are cooked before spoiling, preventing the average 30% household food waste loss.',
            tags: ['refrigerator', 'fifo', 'pantry']
        },
        {
            id: 'iq_f5',
            category: 'Food & Sustainable Eating',
            difficulty: 'Advanced',
            scenario: 'Which of the following organic kitchen scrap items should be RESTRICTED or avoided in a small, non-tumbling indoor balcony compost bin?',
            options: [
                'Raw vegetable peels and crushed eggshells',
                'Used coffee grounds and dry tea leaves',
                'Heavy cooked animal bones, large amounts of dairy, and greasy cooking oils',
                'Dry shredded cardboard and coconut coir'
            ],
            correctIndex: 2,
            explanation: 'Heavy meats, dairy, and oils decompose slowly in small passive bins, create foul putrid odors, and attract rodents and maggots before aerobic composting can establish.',
            tags: ['compost', 'kitchen-scraps', 'balance']
        },

        // =====================================================================
        // CATEGORY 5: E-WASTE & TECHNOLOGY (5 Questions)
        // =====================================================================
        {
            id: 'iq_ew1',
            category: 'E-Waste & Technology',
            difficulty: 'Easy',
            scenario: 'You have two dead AA batteries and an old swollen smartphone battery. How should you safely store and dispose of them?',
            options: [
                'Throw them into the general kitchen wet trash bin',
                'Tape the exposed metal contact terminals with clear tape to prevent short circuits and drop them at an authorized e-waste collection bin',
                'Puncture the swollen battery with a nail to release trapped air',
                'Bury them in your indoor potted plants'
            ],
            correctIndex: 1,
            explanation: 'Taping battery terminals prevents contact friction from sparking fires. Specialized e-waste processors extract hazardous lead, cadmium, and valuable lithium safely.',
            tags: ['batteries', 'e-waste', 'safety']
        },
        {
            id: 'iq_ew2',
            category: 'E-Waste & Technology',
            difficulty: 'Medium',
            scenario: 'You have a collection of broken charging cables, dead wired earphones, and a cracked computer mouse. Where should these items go?',
            options: [
                'Dry municipal paper recycling bin',
                'A dedicated e-waste collection point or authorized producer responsibility take-back drive',
                'Compost bin to biodegrade',
                'Street corner bonfire'
            ],
            correctIndex: 1,
            explanation: 'Cables contain copper conductors insulated with PVC plastic. Standard recycling sorters cannot process them; e-waste shredders strip and recover the pure copper wire safely.',
            tags: ['cables', 'e-waste', 'copper']
        },
        {
            id: 'iq_ew3',
            category: 'E-Waste & Technology',
            difficulty: 'Advanced',
            scenario: 'What is the hidden environmental impact of keeping thousands of obsolete emails, uncompressed video drafts, and duplicate photo backups stored indefinitely in cloud storage?',
            options: [
                'It causes satellites to fall out of orbit',
                'Data centers consume continuous grid electricity for server processors and massive refrigerated chilled-water cooling systems 24/7',
                'It consumes personal laptop battery even when powered off',
                'Cloud storage has zero physical infrastructure or energy footprint'
            ],
            correctIndex: 1,
            explanation: 'The "cloud" resides in physical server farms operating round-the-clock cooling systems, backup generators, and spinning hard drives, contributing over 2% of global electricity demand.',
            tags: ['digital-carbon', 'data-centers', 'cloud']
        },
        {
            id: 'iq_ew4',
            category: 'E-Waste & Technology',
            difficulty: 'Easy',
            scenario: 'Your 3-year-old laptop is running slower than usual. Before considering buying a brand new replacement, what is the most circular, eco-conscious step?',
            options: [
                'Immediately smash it and throw it in the trash',
                'Clean out startup programs, upgrade the storage to an SSD, clean internal fan dust, or reinstall the operating system',
                'Leave it permanently connected to a high-voltage outlet',
                'Buy two new laptops at once'
            ],
            correctIndex: 1,
            explanation: 'Upgrading RAM, switching to a solid-state drive (SSD), and clearing internal dust extends computer usability by 3-5 years, preventing the massive embedded carbon of new manufacturing.',
            tags: ['repair', 'laptop', 'longevity']
        },
        {
            id: 'iq_ew5',
            category: 'E-Waste & Technology',
            difficulty: 'Medium',
            scenario: 'Why are compact fluorescent lamps (CFL spirals) and fluorescent tube lights classified as hazardous waste rather than general dry glass recycling?',
            options: [
                'They contain small amounts of toxic mercury vapor that releases into the air if broken',
                'They are made of flammable cardboard',
                'They emit dangerous x-rays even when turned off',
                'Their glass is too strong to be crushed'
            ],
            correctIndex: 0,
            explanation: 'CFLs contain hazardous mercury vapor. When crushed in standard bins, mercury is inhaled by waste workers and leaches into watershed ecosystems.',
            tags: ['cfl', 'mercury', 'hazardous']
        },

        // =====================================================================
        // CATEGORY 6: SUSTAINABLE FASHION (5 Questions)
        // =====================================================================
        {
            id: 'iq_sf1',
            category: 'Sustainable Fashion',
            difficulty: 'Easy',
            scenario: 'You have a pair of denim jeans with a torn knee hole that you no longer wear. What is the most sustainable approach?',
            options: [
                'Throw them directly into the trash bin where they end up in a landfill',
                'Try creative sashiko mending, cut them into summer shorts, or upcycle the heavy denim fabric into a sturdy reusable tote bag',
                'Burn them in your garden',
                'Flush the fabric pieces down the toilet'
            ],
            correctIndex: 1,
            explanation: 'Denim is durable cotton twill that took thousands of litres of water to produce. Repairing or upcycling keeps the high-value textile in productive circulation for years.',
            tags: ['denim', 'upcycling', 'mending']
        },
        {
            id: 'iq_sf2',
            category: 'Sustainable Fashion',
            difficulty: 'Medium',
            scenario: 'How does washing synthetic garments (polyester fleece, nylon activewear) on cold, gentle cycles with full loads help the environment?',
            options: [
                'It turns synthetic polymers into pure organic linen',
                'It significantly reduces fiber friction and thermal stress, preventing thousands of microplastic fibers from shedding into waterways while saving heating electricity',
                'It guarantees clothes will never get dirty again',
                'It has zero environmental effect'
            ],
            correctIndex: 1,
            explanation: 'Cold water washing prevents thermal fiber weakening, while full loads minimize friction shedding. This drastically cuts microplastic contamination in oceans and saves 90% of washer energy.',
            tags: ['microplastics', 'laundry', 'textiles']
        },
        {
            id: 'iq_sf3',
            category: 'Sustainable Fashion',
            difficulty: 'Easy',
            scenario: 'Why is the ultra-fast fashion business model considered deeply destructive to global ecosystems and labor communities?',
            options: [
                'Fast fashion companies only produce 1 garment per year',
                'It relies on rapid trend obsolescence, cheap non-biodegradable synthetic petrochemical fabrics, and toxic untreated dye runoff into developing world rivers',
                'Fast fashion clothes are too durable and last 1,000 years',
                'It uses zero water in production'
            ],
            correctIndex: 1,
            explanation: 'Fast fashion produces 100+ billion garments annually, mostly from virgin polyester, encouraging disposable culture where clothes are worn an average of just 7 times before disposal.',
            tags: ['fast-fashion', 'pollution', 'ethics']
        },
        {
            id: 'iq_sf4',
            category: 'Sustainable Fashion',
            difficulty: 'Medium',
            scenario: 'You need an outfit for an upcoming one-time university formal event. Which choice has the lowest carbon and resource footprint?',
            options: [
                'Buy a brand new fast fashion dress/suit that you will never wear again',
                'Borrow from a friend, thrift from a vintage store, or rent the formal attire for the weekend',
                'Order 5 options online and throw away the 4 that do not fit',
                'Have a custom polyester outfit flown in by air freight'
            ],
            correctIndex: 1,
            explanation: 'Borrowing, thrifting, or renting maximizes the utilization rate of existing formal wear with zero new manufacturing or supply chain emissions.',
            tags: ['renting', 'thrifting', 'wardrobe']
        },
        {
            id: 'iq_sf5',
            category: 'Sustainable Fashion',
            difficulty: 'Advanced',
            scenario: 'Why are garments made of blended composite fibers (e.g. 55% Cotton / 45% Polyester) nearly impossible to mechanically recycle at scale today?',
            options: [
                'They are too heavy for industrial scales',
                'Natural cellulose fibers and synthetic plastic polymers are so tightly interwoven that chemical and mechanical sorters cannot cost-effectively separate them for fiber recovery',
                'Blended fabrics dissolve in water',
                'Recycling factories are legally prohibited from touching cotton'
            ],
            correctIndex: 1,
            explanation: 'Separating blended natural and synthetic polymers requires complex, energy-intensive chemical dissolution that is not yet viable at industrial scale, condemning blended garments to downcycling or landfills.',
            tags: ['blended-fabrics', 'textile-recycling', 'materials']
        },

        // =====================================================================
        // CATEGORY 7: BIODIVERSITY & WILDLIFE (5 Questions)
        // =====================================================================
        {
            id: 'iq_b1',
            category: 'Biodiversity & Wildlife',
            difficulty: 'Easy',
            scenario: 'You want to create a small pollinator sanctuary on your sunny apartment balcony or terrace. Which planting approach is most beneficial for native bees and butterflies?',
            options: [
                'Plant artificial plastic decorative flowers',
                'Choose indigenous native flowering plants (like marigold, tulsi, sunflower, lavender) that local insects have co-evolved to feed on',
                'Spray all balcony plants daily with heavy synthetic chemical insecticides',
                'Cover the entire balcony in solid concrete and remove all soil'
            ],
            correctIndex: 1,
            explanation: 'Native pollinators rely on the specific nectar chemistry and pollen structures of indigenous flora that have co-evolved in the local micro-ecosystem.',
            tags: ['pollinators', 'native-plants', 'balcony']
        },
        {
            id: 'iq_b2',
            category: 'Biodiversity & Wildlife',
            difficulty: 'Medium',
            scenario: 'During intense summer heatwaves in urban cities, how can residents easily support urban birds and thirsty honeybees without creating mosquito hazards?',
            options: [
                'Set out stagnant deep plastic buckets left uncleaned for weeks',
                'Place shallow terracotta dishes with clean water and floating pebbles/twigs for safe landing, changing the water daily',
                'Scatter sugar-coated synthetic candy bars on sidewalks',
                'Spray birds with water hoses'
            ],
            correctIndex: 1,
            explanation: 'Pebbles provide safe landing footholds so bees and small birds do not drown, while daily water replacement prevents mosquito larvae from breeding.',
            tags: ['birds', 'bees', 'urban-wildlife']
        },
        {
            id: 'iq_b3',
            category: 'Biodiversity & Wildlife',
            difficulty: 'Advanced',
            scenario: 'Why are monoculture tree plantations (such as planting thousands of identical eucalyptus trees) considered vastly inferior to multi-species native reforestation?',
            options: [
                'Monoculture plantations are too colorful for animals',
                'Monocultures lack structural canopy diversity, fail to support interdependent insect/bird food webs, and deplete local water tables rapidly',
                'Native trees do not absorb carbon dioxide',
                'Monocultures are immune to all diseases'
            ],
            correctIndex: 1,
            explanation: 'Single-species plantations lack the multi-layered ecological niches, diverse root structures, and symbiotic fungi networks required to sustain true wildlife biodiversity.',
            tags: ['monoculture', 'reforestation', 'biodiversity']
        },
        {
            id: 'iq_b4',
            category: 'Biodiversity & Wildlife',
            difficulty: 'Medium',
            scenario: 'You discover aphids (small green plant pests) attacking your balcony tomato plant. What is the most ecologically balanced response?',
            options: [
                'Spray dangerous broad-spectrum synthetic chemical pesticides that kill all beneficial ladybugs and bees in the neighborhood',
                'Wash them off with a gentle spray of diluted neem oil and mild soapy water, or introduce beneficial predatory insects like ladybugs',
                'Set the whole plant on fire',
                'Pour bleach directly into the potting soil'
            ],
            correctIndex: 1,
            explanation: 'Broad-spectrum poisons eliminate natural predatory insects, causing pest resurgences. Organic neem oil and soap disrupt pest cell membranes without toxic environmental persistence.',
            tags: ['pest-control', 'neem-oil', 'organic-gardening']
        },
        {
            id: 'iq_b5',
            category: 'Biodiversity & Wildlife',
            difficulty: 'Easy',
            scenario: 'Why should fallen autumn leaves under garden shrubs be left in place or mulched rather than gathered in plastic bags and burned?',
            options: [
                'Leaves are made of pure plastic',
                'Fallen leaves create natural organic mulch that protects topsoil moisture, feeds earthworms, and provides winter shelter for beneficial insects',
                'Burning leaves produces clean drinking water',
                'Leaves prevent all plants from growing'
            ],
            correctIndex: 1,
            explanation: 'Leaf litter is nature’s soil conditioner. Mulching returns vital carbon and potassium to topsoil while preventing soil erosion and preserving insect biodiversity.',
            tags: ['mulch', 'soil', 'leaves']
        },

        // =====================================================================
        // CATEGORY 8: PLASTIC & OCEANS (5 Questions)
        // =====================================================================
        {
            id: 'iq_po1',
            category: 'Plastic & Oceans',
            difficulty: 'Easy',
            scenario: 'What is the most accurate description of what happens to standard petroleum-based plastic bags and bottles when they enter the ocean environment?',
            options: [
                'They safely dissolve and turn into healthy sea minerals within 1 month',
                'They undergo photo-degradation from sunlight and waves, fragmenting into microscopic toxic plastic particles (microplastics) that never truly mineralize',
                'They sink and permanently seal volcanic vents on the ocean floor',
                'Marine fish convert plastics into natural coral calcium'
            ],
            correctIndex: 1,
            explanation: 'Petroleum plastics do not biodegrade in water; they shatter into billions of microscopic particles that absorb marine pollutants and bioaccumulate across food webs.',
            tags: ['microplastics', 'ocean', 'marine-life']
        },
        {
            id: 'iq_po2',
            category: 'Plastic & Oceans',
            difficulty: 'Medium',
            scenario: 'When ordering takeout meals or purchasing iced beverages, which simple habit prevents the generation of single-use plastic waste at the source?',
            options: [
                'Asking for 5 extra plastic spoons and 10 plastic straws "just in case"',
                'Checking the "No Plastic Cutlery / Napkins" box in food delivery apps and carrying a reusable water tumbler and stainless steel straw',
                'Throwing all plastic cutlery onto the street sidewalk',
                'Eating the plastic spoon after finishing the meal'
            ],
            correctIndex: 1,
            explanation: 'Refusing single-use items in delivery apps and carrying reusable essentials eliminates plastic waste at the source before it is ever manufactured or transported.',
            tags: ['takeout', 'refuse', 'zero-waste']
        },
        {
            id: 'iq_po3',
            category: 'Plastic & Oceans',
            difficulty: 'Advanced',
            scenario: 'How does global ocean acidification—caused by seawater absorbing excess atmospheric carbon dioxide—harm marine organisms like corals, oysters, and sea snails?',
            options: [
                'It turns the water into boiling acid instantly',
                'It lowers ocean pH and depletes free carbonate ions, making it chemically difficult for calcifying marine life to build and maintain their calcium carbonate shells and coral reefs',
                'It increases the salt concentration so much that fish cannot swim',
                'It only affects freshwater rivers, not oceans'
            ],
            correctIndex: 1,
            explanation: 'Dissolved CO2 forms carbonic acid, binding with ambient carbonate ions that marine shell-builders and corals require to construct their protective skeletons.',
            tags: ['ocean-acidification', 'coral-reefs', 'chemistry']
        },
        {
            id: 'iq_po4',
            category: 'Plastic & Oceans',
            difficulty: 'Medium',
            scenario: 'You are shopping for sunscreen before a beach holiday near a coastal marine park. What ingredient specification protects fragile coral reef ecosystems from bleaching?',
            options: [
                'Sunscreens containing high concentrations of chemical Oxybenzone and Octinoxate',
                'Non-nano Mineral Zinc Oxide or Titanium Dioxide formulated "Reef-Safe" sunscreens',
                'Motor oil mixed with coconut oil',
                'Any aerosol spray sunscreen with synthetic glitter'
            ],
            correctIndex: 1,
            explanation: 'Oxybenzone and octinoxate disrupt coral reproduction and induce severe bleaching at minute concentrations. Non-nano mineral zinc oxide stays on skin and does not penetrate coral cells.',
            tags: ['sunscreen', 'coral-safe', 'marine']
        },
        {
            id: 'iq_po5',
            category: 'Plastic & Oceans',
            difficulty: 'Easy',
            scenario: 'Why are thin single-use plastic film carry bags (under 50 microns) so dangerous for marine turtles and seabirds in coastal waters?',
            options: [
                'They look like dangerous sharks',
                'Turtles mistake floating translucent plastic bags for their primary natural prey—jellyfish—causing fatal digestive blockages',
                'Plastic bags make the ocean too dark for birds to fly',
                'Plastic bags dissolve into boiling water'
            ],
            correctIndex: 1,
            explanation: 'Floating plastic bags mimic jellyfish morphology in ocean currents. Ingestion causes intestinal impaction, malnutrition, and eventual starvation in sea turtles.',
            tags: ['sea-turtles', 'plastic-bags', 'wildlife']
        },

        // =====================================================================
        // CATEGORY 9: SUSTAINABLE TRANSPORTATION (5 Questions)
        // =====================================================================
        {
            id: 'iq_t1',
            category: 'Sustainable Transportation',
            difficulty: 'Easy',
            scenario: 'You need to make a quick 1.2 km trip to your neighborhood grocery store for milk and bread. Which travel choice minimizes carbon emissions and traffic congestion?',
            options: [
                'Driving an SUV alone with the engine idling while parked outside',
                'Walking or riding a bicycle with a sturdy front basket or backpack',
                'Calling a private ride-share taxi to drive 1 km to pick you up',
                'Ordering express 10-minute motorcycle delivery for a single item'
            ],
            correctIndex: 1,
            explanation: 'Active mobility (walking or cycling) for short trips under 2 km produces zero tailpipe emissions, reduces street congestion, and provides immediate cardiovascular health benefits.',
            tags: ['active-mobility', 'walking', 'biking']
        },
        {
            id: 'iq_t2',
            category: 'Sustainable Transportation',
            difficulty: 'Medium',
            scenario: 'When comparing daily office or college commutes across a 15 km distance, why is electric metro rail or bus transit dramatically more eco-friendly than driving a personal car?',
            options: [
                'Public trains run entirely on magic',
                'Mass transit achieves massive passenger density per vehicle, slashing carbon emissions per passenger-kilometer by up to 75% compared to single-occupant cars',
                'Cars produce zero emissions when driving on highways',
                'Public transit has no environmental footprint at all'
            ],
            correctIndex: 1,
            explanation: 'Shared mass transit spreads energy and road infrastructure across hundreds of riders, drastically lowering per-capita fuel consumption, road wear, and particulate emissions.',
            tags: ['public-transit', 'metro', 'efficiency']
        },
        {
            id: 'iq_t3',
            category: 'Sustainable Transportation',
            difficulty: 'Medium',
            scenario: 'How does maintaining proper vehicle tire pressure contribute to environmental sustainability for existing petrol or diesel cars?',
            options: [
                'It turns the car into an electric vehicle',
                'Properly inflated tires minimize rolling resistance, improving fuel economy by 3-5% and preventing premature rubber tire wear and micro-particle pollution',
                'Under-inflated tires use zero fuel',
                'Tire pressure only affects the color of the wheels'
            ],
            correctIndex: 1,
            explanation: 'Under-inflated tires increase mechanical rolling drag, forcing engines to burn extra fuel per kilometer while shedding excessive tire rubber microplastics onto roads.',
            tags: ['tire-pressure', 'fuel-efficiency', 'maintenance']
        },
        {
            id: 'iq_t4',
            category: 'Sustainable Transportation',
            difficulty: 'Easy',
            scenario: 'What is the concept of "Trip Chaining" in sustainable everyday living?',
            options: [
                'Locking your bicycle with five heavy steel chains',
                'Consolidating multiple individual errands (groceries, pharmacy, postal drop) into a single linked circular journey rather than making separate round-trips',
                'Driving in circles around a shopping mall for hours',
                'Taking a train across five continents'
            ],
            correctIndex: 1,
            explanation: 'Trip chaining eliminates cold-engine starts and redundant mileage, cutting total vehicle travel distance and associated fuel burn by 20-40%.',
            tags: ['trip-chaining', 'logistics', 'efficiency']
        },
        {
            id: 'iq_t5',
            category: 'Sustainable Transportation',
            difficulty: 'Advanced',
            scenario: 'When evaluating the full lifecycle emissions of Electric Vehicles (EVs) versus Internal Combustion Engine (ICE) vehicles, what is the key finding of lifecycle assessments?',
            options: [
                'EVs emit more carbon over their lifetime than diesel trucks in all scenarios',
                'While EV battery manufacturing has higher upfront embodied emissions, an EV pays off its carbon debt within 1-2 years of driving and produces far lower lifetime emissions, especially as grids decarbonize',
                'ICE vehicles produce zero tailpipe emissions after 5 years',
                'EVs require coal to be burned directly inside the engine'
            ],
            correctIndex: 1,
            explanation: 'Electric drivetrains are 3x more efficient than combustion engines. Even on mixed electricity grids, EVs generate significantly fewer lifecycle emissions per kilometer over their lifespan.',
            tags: ['ev', 'lifecycle', 'emissions']
        },

        // =====================================================================
        // CATEGORY 10: SUSTAINABLE CONSUMPTION (5 Questions)
        // =====================================================================
        {
            id: 'iq_sc1',
            category: 'Sustainable Consumption',
            difficulty: 'Easy',
            scenario: 'In the circular 6 Rs waste hierarchy (Refuse, Reduce, Reuse, Repair, Repurpose, Recycle), why does "Refuse" occupy the highest priority position?',
            options: [
                'Because refusing is the most expensive option',
                'Because declining unnecessary products and packaging at the source prevents raw material extraction, manufacturing emissions, and waste processing entirely',
                'Because recycling makes all materials disappear instantly',
                'Refusing has no effect on supply chains'
            ],
            correctIndex: 1,
            explanation: 'Preventing an unwanted item from entering the economic stream eliminates 100% of the upstream carbon, water, mining, and packaging footprints required to create it.',
            tags: ['6-rs', 'refuse', 'circular-economy']
        },
        {
            id: 'iq_sc2',
            category: 'Sustainable Consumption',
            difficulty: 'Medium',
            scenario: 'You are tempted to make an impulsive online purchase for an item you saw in a social media flash sale. Which behavioral tool helps ensure mindful consumption?',
            options: [
                'Immediately click "1-Click Buy Now" with express air shipping',
                'Apply the "30-Day Waiting Rule": save the item on a wishlist and evaluate after 30 days whether it is genuinely necessary or just fleeting dopamine',
                'Order 10 copies of the item and give them to strangers',
                'Borrow money to buy everything on the website'
            ],
            correctIndex: 1,
            explanation: 'The 30-day cooling-off rule interrupts impulsive dopamine triggers, eliminating over 70% of unnecessary consumer purchases and preventing cluttered household waste.',
            tags: ['mindful-buying', 'habits', 'minimalism']
        },
        {
            id: 'iq_sc3',
            category: 'Sustainable Consumption',
            difficulty: 'Medium',
            scenario: 'You need an electric drill to hang two picture frames in your new apartment. What is the most circular, cost-effective solution?',
            options: [
                'Buy the cheapest disposable plastic drill online and throw it away tomorrow',
                'Borrow from a neighbor, use a community tool library, or rent from a local hardware store',
                'Hammer the screws in with a ceramic coffee mug',
                'Hire an airplane to bring a drill from another country'
            ],
            correctIndex: 1,
            explanation: 'The average consumer power drill is used for only 12-15 minutes across its entire lifetime. Tool sharing and renting maximize asset utility while saving money and manufacturing resources.',
            tags: ['tool-library', 'sharing-economy', 'reuse']
        },
        {
            id: 'iq_sc4',
            category: 'Sustainable Consumption',
            difficulty: 'Easy',
            scenario: 'Why is buying staple dry food goods (rice, lentils, spices, rolled oats) in larger bulk quantities or at refill stores superior to buying tiny single-use plastic sachets?',
            options: [
                'Bulk goods are always made of plastic',
                'Bulk purchasing drastically reduces packaging-to-product weight ratios, cuts retail unit costs, and eliminates dozens of non-recyclable multi-layer laminate pouches',
                'Single-use sachets biodegrade in 2 minutes',
                'Bulk items do not need to be cooked'
            ],
            correctIndex: 1,
            explanation: 'Bulk packaging minimizes surface-area-to-volume packaging ratios, eliminating the ubiquitous single-use plastic foil pouches that clog urban waterways.',
            tags: ['bulk-shopping', 'packaging', 'zero-waste']
        },
        {
            id: 'iq_sc5',
            category: 'Sustainable Consumption',
            difficulty: 'Advanced',
            scenario: 'What is "Planned Obsolescence" in industrial consumer manufacturing, and how can consumers actively combat it?',
            options: [
                'Designing products to last 500 years with free repairs',
                'Deliberately designing products with artificially limited lifespans or unrepairable glued parts to force recurring consumer replacement; consumers combat it by supporting the "Right to Repair" and choosing modular goods',
                'A law requiring all products to be made of wood',
                'A process where factories shut down permanently after making one item'
            ],
            correctIndex: 1,
            explanation: 'Planned obsolescence manufactures artificial fragility and glued components. Consumers fight back by purchasing repairable, modular brands and supporting Right to Repair legislation.',
            tags: ['planned-obsolescence', 'right-to-repair', 'durability']
        },

        // =====================================================================
        // CATEGORY 11: GREEN HOMES & EVERYDAY LIVING (5 Questions)
        // =====================================================================
        {
            id: 'iq_gh1',
            category: 'Green Homes & Everyday Living',
            difficulty: 'Easy',
            scenario: 'You want to clean bathroom water stains, kitchen counters, and glass mirrors without purchasing harsh synthetic chemical aerosol cleaners. What non-toxic pantry solution works wonders?',
            options: [
                'Pouring engine gasoline over all surfaces',
                'A spray bottle with a 1:1 mixture of warm water and white distilled vinegar (mild acetic acid) with optional citrus peels for fresh scent',
                'Mixing ammonia and chlorine bleach in an unventilated room',
                'Spraying perfume directly on the mirrors'
            ],
            correctIndex: 1,
            explanation: 'White vinegar is a natural mild acid that dissolves hard water mineral scale, soap scum, and grease effectively without releasing volatile organic compounds (VOCs) into indoor air.',
            tags: ['green-cleaning', 'vinegar', 'non-toxic']
        },
        {
            id: 'iq_gh2',
            category: 'Green Homes & Everyday Living',
            difficulty: 'Medium',
            scenario: 'Why is it critical NEVER to mix household chlorine bleach with acidic cleaners like vinegar or ammonia-based window sprays?',
            options: [
                'It creates sweet-tasting sugar water',
                'It triggers an immediate chemical reaction releasing toxic, choking chlorine gas or chloramine vapors that cause severe respiratory and lung damage',
                'It permanently turns the mop handle green',
                'It simply neutralizes both liquids with zero risk'
            ],
            correctIndex: 1,
            explanation: 'Bleach reacts violently with acids and ammonia, releasing lethal chlorine and chloramine gas that damages mucous membranes and can be fatal in enclosed spaces.',
            tags: ['bleach', 'safety', 'hazards']
        },
        {
            id: 'iq_gh3',
            category: 'Green Homes & Everyday Living',
            difficulty: 'Easy',
            scenario: 'What simple daily ventilation habit dramatically improves indoor air quality and removes accumulated carbon dioxide and indoor pollutants in bedrooms?',
            options: [
                'Sealing all doors and windows with duct tape permanently',
                'Opening opposite windows for 10-15 minutes every morning to create cross-ventilation and flush out stale indoor air and VOCs',
                'Burning 10 synthetic incense sticks simultaneously with windows shut',
                'Spraying chemical aerosol room fresheners every hour'
            ],
            correctIndex: 1,
            explanation: 'Opening windows on opposing walls creates natural pressure differentials (cross-ventilation), rapidly displacing indoor CO2, moisture, and chemical off-gassing with fresh outdoor air.',
            tags: ['ventilation', 'indoor-air', 'health']
        },
        {
            id: 'iq_gh4',
            category: 'Green Homes & Everyday Living',
            difficulty: 'Medium',
            scenario: 'How do common indoor houseplants like the Snake Plant (Sansevieria), Spider Plant, and Peace Lily contribute to home well-being?',
            options: [
                'They generate nuclear power for home lamps',
                'They absorb trace indoor toxins (like formaldehyde and benzene), increase ambient humidity, and produce oxygen through natural photosynthesis',
                'They eliminate the need to ever clean the floor',
                'They turn all kitchen food into organic compost automatically'
            ],
            correctIndex: 1,
            explanation: 'Houseplants filter airborne volatile organic compounds through leaf stomata and root-associated microflora, while providing calming biophilic psychological benefits.',
            tags: ['houseplants', 'air-quality', 'biophilia']
        },
        {
            id: 'iq_gh5',
            category: 'Green Homes & Everyday Living',
            difficulty: 'Advanced',
            scenario: 'How should you safely dispose of leftover cooking oil after deep-frying rather than pouring it hot down your kitchen sink drain?',
            options: [
                'Pour it boiling hot down the sink drain with cold water to make it harden immediately',
                'Allow it to cool, strain and store in a glass jar for reuse, or absorb it into sawdust/newspaper for solid organic disposal or drop at a used cooking oil biofuel collector',
                'Pour it directly onto the street asphalt',
                'Flush it down the toilet'
            ],
            correctIndex: 1,
            explanation: 'Cooking oil poured down household drains solidifies with soap scum inside municipal sewer pipes, forming gigantic underground "fatbergs" that block city sewer networks.',
            tags: ['cooking-oil', 'fatbergs', 'plumbing']
        },

        // =====================================================================
        // CATEGORY 12: CLIMATE AWARENESS (5 Questions)
        // =====================================================================
        {
            id: 'iq_ca1',
            category: 'Climate Awareness',
            difficulty: 'Easy',
            scenario: 'What is the primary greenhouse gas released by human activities (such as burning coal, petroleum, and natural gas for power and transport)?',
            options: [
                'Pure Oxygen (O2)',
                'Carbon Dioxide (CO2)',
                'Helium (He)',
                'Argon (Ar)'
            ],
            correctIndex: 1,
            explanation: 'Combustion of fossil fuels releases billions of tons of carbon dioxide annually, trapping thermal infrared radiation in the lower atmosphere and driving global warming.',
            tags: ['co2', 'fossil-fuels', 'greenhouse-effect']
        },
        {
            id: 'iq_ca2',
            category: 'Climate Awareness',
            difficulty: 'Medium',
            scenario: 'When carbon footprint accountants categorize greenhouse gas emissions into Scope 1, Scope 2, and Scope 3, what does "Scope 1" represent?',
            options: [
                'Direct emissions from sources owned or controlled directly by you or an organization (e.g. burning petrol in your car engine or gas in your stove)',
                'Indirect emissions from the electricity you purchase from the power company (Scope 2)',
                'All upstream supply chain emissions from factories that made your shoes (Scope 3)',
                'Emissions occurring on other planets'
            ],
            correctIndex: 0,
            explanation: 'Scope 1 covers direct onsite combustion (fuel in vehicles, boilers, natural gas burners). Scope 2 is purchased power; Scope 3 covers full lifecycle supply chain goods.',
            tags: ['scope-1', 'carbon-accounting', 'emissions']
        },
        {
            id: 'iq_ca3',
            category: 'Climate Awareness',
            difficulty: 'Advanced',
            scenario: 'What is meant by an ecological "Climate Tipping Point" (such as the collapse of the West Antarctic Ice Sheet or Amazon rainforest dieback)?',
            options: [
                'A point where all temperatures drop to freezing everywhere forever',
                'A critical threshold where a small additional temperature increase triggers self-reinforcing, irreversible, and abrupt changes in the global climate system',
                'The date when all weather forecasting stops working',
                'A point where carbon dioxide turns into gold'
            ],
            correctIndex: 1,
            explanation: 'Tipping points represent thresholds where natural feedback loops (e.g. melting permafrost releasing methane) accelerate warming independently of human emissions, risking runaway climate disruption.',
            tags: ['tipping-points', 'climate-science', 'feedback-loops']
        },
        {
            id: 'iq_ca4',
            category: 'Climate Awareness',
            difficulty: 'Medium',
            scenario: 'What is the fundamental difference between Climate Mitigation and Climate Adaptation?',
            options: [
                'They are completely identical words with no difference',
                'Mitigation focuses on reducing or preventing greenhouse gas emissions at the source; Adaptation focuses on adjusting and building resilience to climate impacts already happening',
                'Mitigation is only for animals; Adaptation is only for plants',
                'Adaptation means moving to another planet'
            ],
            correctIndex: 1,
            explanation: 'Mitigation attacks the root cause (solar power, afforestation, efficiency). Adaptation manages the symptoms (sea walls, drought-resistant crops, flood defenses, heat emergency plans).',
            tags: ['mitigation', 'adaptation', 'policy']
        },
        {
            id: 'iq_ca5',
            category: 'Climate Awareness',
            difficulty: 'Easy',
            scenario: 'Why does the global goal of limiting planetary warming to 1.5°C above pre-industrial levels matter so critically compared to allowing 2.0°C or higher warming?',
            options: [
                '1.5°C is just a random number with no scientific significance',
                'At 1.5°C, coral reef loss is limited to 70-90% (vs 99% at 2°C), hundreds of millions fewer people face severe heatwaves, and catastrophic sea-level rise risks are significantly reduced',
                '2.0°C warming would make everyone colder',
                'The atmosphere cannot physically reach 2°C'
            ],
            correctIndex: 1,
            explanation: 'IPCC scientific assessments prove that every fraction of a degree matters: 1.5°C preserves critical ecosystems, limits irreversible ice sheet loss, and protects vulnerable coastal communities.',
            tags: ['paris-agreement', '1.5-degrees', 'ipcc']
        }
    ];

    questions.forEach(q => {
        if (!q.question && q.scenario) q.question = q.scenario;
        if (typeof q.correctAnswer === 'undefined' && typeof q.correctIndex === 'number') q.correctAnswer = q.correctIndex;
    });

    if (typeof window !== 'undefined') {
        window.EcoIQData = questions;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = questions;
    }
})();
