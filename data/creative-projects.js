/**
 * ECOQUEST DATA MODULE: CREATIVE UP-CYCLING PROJECTS
 * 16 Practical, ₹0-cost DIY projects with step-by-step guides, safety notes,
 * and exact material mappings used by the scoring recommendation engine.
 */
(function() {
    const materials = [
        { id: 'mat_cardboard', name: 'Cardboard Box', icon: 'package' },
        { id: 'mat_plastic_bottle', name: 'Plastic Bottles', icon: 'droplet' },
        { id: 'mat_old_clothes', name: 'Old Clothes / Denim', icon: 'shirt' },
        { id: 'mat_glass_jar', name: 'Glass Jars', icon: 'coffee' },
        { id: 'mat_newspaper', name: 'Newspaper / Scrap Paper', icon: 'newspaper' },
        { id: 'mat_tin_can', name: 'Aluminum / Tin Cans', icon: 'cylinder' },
        { id: 'mat_packaging', name: 'Bubble Wrap / Packaging', icon: 'layers' },
        { id: 'mat_egg_carton', name: 'Egg Cartons', icon: 'grid' },
        { id: 'mat_fabric_scraps', name: 'Fabric Scraps & Rags', icon: 'scissors' }
    ];

    const projects = [
        {
            id: 'proj_1',
            title: 'Multi-Tier Cardboard Desk Organizer',
            category: 'Desk & Study',
            materials: ['mat_cardboard'],
            time: '15 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 35,
            desc: 'Transform a delivery box into a multi-slot organizer for pens, notebooks, sticky pads, and stationery.',
            safetyNote: 'Use scissors or a craft cutter carefully on a flat cutting mat or thick scrap backing.',
            instructions: [
                'Cut the top flaps off a small-to-medium corrugated shipping box.',
                'Cut angled side dividers from leftover cardboard flaps at a 45-degree slope.',
                'Slot and glue internal divider walls to create front pen cups and back notebook slots.',
                'Wrap the exterior in recycled brown kraft paper or draw decorative patterns with markers.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_2',
            title: 'Self-Watering Sub-Irrigated Herb Planter',
            category: 'Home & Garden',
            materials: ['mat_plastic_bottle', 'mat_fabric_scraps'],
            time: '12 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 35,
            desc: 'Repurpose a 1L or 2L clear plastic bottle into a passive capillary-wicking planter that waters herbs automatically.',
            safetyNote: 'Smooth any sharp plastic cut edges with sandpaper or cover with paper tape.',
            instructions: [
                'Carefully cut a plastic bottle horizontally into two halves at the 40% mark from the top.',
                'Pierce a 5mm hole through the plastic screw cap using a heated metal pin or nail.',
                'Thread a 15cm strip of natural cotton cloth or thick yarn through the cap hole to act as a capillary wick.',
                'Invert the top half into the bottom reservoir, fill the top funnel with potting soil and seeds, and fill the bottom base with water.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_3',
            title: 'No-Sew Denim Pocket Grocery Tote',
            category: 'Fashion & Bags',
            materials: ['mat_old_clothes'],
            time: '20 mins',
            cost: '₹0 Cost',
            difficulty: 'Medium',
            xpReward: 40,
            desc: 'Turn a pair of worn-out denim jeans or an old heavy cotton shirt into a durable heavy-duty grocery shopping bag.',
            safetyNote: 'Take care while cutting through thick denim seams.',
            instructions: [
                'Cut off both legs of the jeans straight across at the crotch line.',
                'Turn the jeans inside out and cut 3cm vertical fringe strips along the bottom opening.',
                'Tie opposing front and back fringe strips tightly together with double square knots to seal the bag bottom firmly.',
                'Cut two long strips from the discarded pant legs and braid them to create heavy-duty shoulder straps, threading them through existing belt loops.'
            ],
            relatedTopic: 'top_6'
        },
        {
            id: 'proj_4',
            title: 'Stained Glass Ambient Candle / Fairy Jar',
            category: 'Decor & Lighting',
            materials: ['mat_glass_jar', 'mat_newspaper'],
            time: '18 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 30,
            desc: 'Upcycle empty jam or pickle jars into ambient desk lanterns using botanical leaf silhouettes and scrap paper.',
            safetyNote: 'Inspect glass jars for hairline cracks before beginning.',
            instructions: [
                'Wash the glass jar with warm soapy water to remove sticky labels and oily residues.',
                'Cut geometric botanical leaf or star silhouettes from scrap newspaper or tissue.',
                'Dilute school glue with a few drops of water and brush onto the jar exterior, smoothing the paper silhouettes into place.',
                'Place an LED tea light or string fairy lights inside to cast warm ambient decorative patterns.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_5',
            title: 'Biodegradable Newspaper Seedling Starter Pots',
            category: 'Home & Garden',
            materials: ['mat_newspaper'],
            time: '10 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Fold biodegradable seedling nursery cups from scrap newspaper sheets that can be planted directly into garden soil.',
            safetyNote: 'No sharp tools required; simple origami folding.',
            instructions: [
                'Cut old black-and-white newspaper sheets into 15cm x 30cm strips (avoid glossy color pages).',
                'Wrap the newspaper strip tightly around a cylindrical spice bottle or drinking glass, leaving 5cm hanging off the bottom.',
                'Fold the excess bottom newspaper inward tightly to form a flat cup base and slide off the bottle.',
                'Fill with potting mix and sow seeds; when ready for transplanting, bury the entire pot directly into soil where the paper safely biodegrades.'
            ],
            relatedTopic: 'top_5'
        },
        {
            id: 'proj_6',
            title: 'Rust-Resistant Tin Can Cutlery & Tool Caddy',
            category: 'Desk & Study',
            materials: ['mat_tin_can', 'mat_cardboard'],
            time: '15 mins',
            cost: '₹0 Cost',
            difficulty: 'Medium',
            xpReward: 35,
            desc: 'Assemble 3-4 washed aluminum soup/beverage cans onto a scrap cardboard backboard to organize art brushes, rulers, and scissors.',
            safetyNote: 'File down any sharp inner metal rim burrs using sandpaper or line the rim with cloth tape.',
            instructions: [
                'Thoroughly wash and dry empty tin cans, smoothing down any sharp upper lid edges.',
                'Wrap the cans in scrap fabric remnants, twine, or brown paper using glue.',
                'Cut a sturdy cardboard rectangular backboard with a top handle hole.',
                'Fasten the cans side-by-side onto the cardboard backing using strong craft glue or wire loops.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_7',
            title: 'Compostable Egg Carton Seedling Incubator',
            category: 'Home & Garden',
            materials: ['mat_egg_carton'],
            time: '8 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Use molded cardboard egg trays as a 12-cell microgreen and vegetable seed germination tray with natural drainage.',
            safetyNote: 'Only use clean dry molded paperboard cartons.',
            instructions: [
                'Separate the egg carton lid from the 12-cup base; place the lid underneath to act as a drainage drip tray.',
                'Poke a small drainage pinhole in the bottom of each egg cup.',
                'Fill each cup with compost soil and sow coriander, tomato, or chili seeds.',
                'When saplings sprout their first true leaves, cut individual cups apart and plant them directly into large garden pots.'
            ],
            relatedTopic: 'top_5'
        },
        {
            id: 'proj_8',
            title: 'Denim & Fabric Scrap Thermal Cup Sleeve',
            category: 'Kitchen & Dining',
            materials: ['mat_old_clothes', 'mat_fabric_scraps'],
            time: '10 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Create an insulated reusable hot coffee or tea mug cozy from leftover hemmed jeans seams or thick cloth scraps.',
            safetyNote: 'Simple scissors and needle-thread or fabric glue.',
            instructions: [
                'Cut a 6cm wide strip of denim from a pant leg or jacket sleeve, sizing it to wrap around your favorite coffee tumbler.',
                'Hem or fray the edges for an intentional rustic aesthetic.',
                'Fasten an elastic loop to one end and sew a salvaged button on the opposite end for adjustable wrap closure.'
            ],
            relatedTopic: 'top_6'
        },
        {
            id: 'proj_9',
            title: 'Plastic Bottle Cap Wall Key Hook & Organizer',
            category: 'Home Organization',
            materials: ['mat_plastic_bottle', 'mat_cardboard'],
            time: '15 mins',
            cost: '₹0 Cost',
            difficulty: 'Medium',
            xpReward: 30,
            desc: 'Combine colorful threaded bottle necks and caps into a wall-mounted entry hallway key rack.',
            safetyNote: 'Take care when slicing the top threaded necks off plastic bottles.',
            instructions: [
                'Cut the top 2.5cm threaded neck spouts off 4 rigid plastic bottles.',
                'Cut 4 matching circular holes into a thick corrugated cardboard strip.',
                'Push the bottle spouts through the cardboard holes from the back and screw the caps on from the front to lock them firmly.',
                'Hang house keys, charging lanyards, and masks securely over the capped protrusions.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_10',
            title: 'Bubble Wrap Window Thermal Insulation Panel',
            category: 'Energy & Climate',
            materials: ['mat_packaging'],
            time: '10 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 30,
            desc: 'Use clean shipping bubble wrap to create a non-destructive thermal insulating barrier on sun-baked window glass.',
            safetyNote: 'No tools needed; uses simple surface water tension.',
            instructions: [
                'Cut clean bubble wrap to the exact dimensions of your window glass pane.',
                'Lightly spray a fine mist of plain water over the inside surface of the window glass.',
                'Press the bubble side of the wrap firmly against the wet glass; water tension holds it securely without any sticky tape.',
                'Trapped air bubbles provide high-efficiency thermal insulation, reducing summertime heat penetration by up to 50% while admitting natural diffuse daylight.'
            ],
            relatedTopic: 'top_3'
        },
        {
            id: 'proj_11',
            title: 'Braided Cotton Scrap Cleaning Sponge & Tawashi',
            category: 'Kitchen & Dining',
            materials: ['mat_fabric_scraps', 'mat_old_clothes'],
            time: '15 mins',
            cost: '₹0 Cost',
            difficulty: 'Medium',
            xpReward: 30,
            desc: 'Weave worn t-shirt loops into a machine-washable Japanese-style "Tawashi" scrubbing pad to replace plastic kitchen sponges.',
            safetyNote: 'Easy finger weaving.',
            instructions: [
                'Cut old cotton t-shirt bodies into continuous 2cm wide horizontal fabric loops.',
                'Create a simple 5x5 square peg loom on cardboard using small notches.',
                'Weave the horizontal and vertical loops in an over-under checkerboard pattern.',
                'Loop the outer edges together to cast off, producing a thick, durable, non-scratch scrubbing pad that washes clean in laundry.'
            ],
            relatedTopic: 'top_6'
        },
        {
            id: 'proj_12',
            title: 'Glass Jar Herb Spice Shaker & Seed Vault',
            category: 'Kitchen & Dining',
            materials: ['mat_glass_jar'],
            time: '10 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Transform small baby food or condiment jars into airtight seed storage vaults and dry herb shakers.',
            safetyNote: 'Puncture lid holes from the top down on a scrap wood block.',
            instructions: [
                'Wash and deodorize glass jars with warm water and baking soda.',
                'Use a small hammer and nail to punch 6-8 shaker holes into the metal lid for spices, or leave intact for airtight seed banking.',
                'Paint the lid with chalkboard paint or write seed collection dates on kraft paper tape labels.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_13',
            title: 'Hanging Plastic Bottle Vertical Balcony Garden',
            category: 'Home & Garden',
            materials: ['mat_plastic_bottle', 'mat_packaging'],
            time: '25 mins',
            cost: '₹0 Cost',
            difficulty: 'Medium',
            xpReward: 40,
            desc: 'String horizontal plastic bottle planters together with twine to build a multi-story vertical herb wall on balcony railings.',
            safetyNote: 'Ensure bottle edges are smooth and twine knots are reinforced.',
            instructions: [
                'Cut a 10cm x 6cm rectangular window flap out of the side of 3 horizontal 2-litre plastic bottles.',
                'Drill small drainage holes on the bottom spine and two hanging holes at both neck and base ends.',
                'Thread durable twine through the bottles, tying knots beneath each level to create a 3-tier hanging cascade.',
                'Fill with soil and plant mint, spinach, or cherry tomatoes on sunny balcony walls.'
            ],
            relatedTopic: 'top_8'
        },
        {
            id: 'proj_14',
            title: 'Scrap Cardboard Cable & Cord Storage Spools',
            category: 'Home Organization',
            materials: ['mat_cardboard'],
            time: '8 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Cut notched H-frame spools from corrugated cardboard to keep tangled charging cords and earphones neatly organized.',
            safetyNote: 'Safe and simple scissors craft.',
            instructions: [
                'Cut 8cm x 12cm rectangular cards from stiff delivery boxes.',
                'Cut triangular notches into both long sides to form an "H" shape.',
                'Cut a small 1cm slit at one edge to pinch and anchor the cable plug tip.',
                'Wind long USB cables or extension cords neatly around the center waist.'
            ],
            relatedTopic: 'top_4'
        },
        {
            id: 'proj_15',
            title: 'Multi-Compartment Egg Carton Jewelry / Screw Tray',
            category: 'Home Organization',
            materials: ['mat_egg_carton'],
            time: '10 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 25,
            desc: 'Color-code and paint a clean egg carton to organize small earrings, rings, buttons, screws, and electronics hardware.',
            safetyNote: 'Non-toxic water colors or gouache paint.',
            instructions: [
                'Trim the carton lid to create a smooth hinged dust cover.',
                'Paint individual cups in contrasting colors to categorize hardware sizes or jewelry pairs.',
                'Fit inside shallow desk drawers for instant compartmentalized drawer organization.'
            ],
            relatedTopic: 'top_1'
        },
        {
            id: 'proj_16',
            title: 'Layered Newspaper Seed Mat / Weed Barrier',
            category: 'Home & Garden',
            materials: ['mat_newspaper'],
            time: '15 mins',
            cost: '₹0 Cost',
            difficulty: 'Easy',
            xpReward: 30,
            desc: 'Sheet-mulch garden beds with 5-6 layers of overlapping newspaper to suppress weeds naturally without toxic herbicides.',
            safetyNote: 'Avoid glossy color ad inserts.',
            instructions: [
                'Layer 5-6 sheets of plain black-and-white newspaper over weed-prone garden soil patches.',
                'Soak thoroughly with water to bond the paper layers together.',
                'Cover with a 5cm layer of natural leaf mulch or compost; weeds are suffocated while earthworms digest the paper into rich humus over 3 months.'
            ],
            relatedTopic: 'top_5'
        }
    ];

    if (typeof window !== 'undefined') {
        window.EcoMaterialsData = materials;
        window.EcoCreativeProjectsData = projects;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { materials, projects };
    }
})();
