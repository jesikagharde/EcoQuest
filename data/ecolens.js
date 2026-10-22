/**
 * ECOQUEST DATA MODULE: ECOLENS WASTE DISPOSAL DIRECTORY
 * 24 Comprehensive everyday household waste & recycling items with verified
 * municipal disposal streams, scientific rationale, avoidance warnings, and links.
 */
(function() {
    const decisions = [
        { 
            id: 'dec_1', 
            query: 'bubble wrap', 
            keywords: ['bubble wrap', 'packaging', 'plastic wrap', 'air cushion', 'shipping wrap', 'protective packaging'],
            title: 'How should plastic bubble wrap and air pillows be handled?', 
            recommendation: 'Save clean bubble wrap for packing gifts, fragile kitchen items, or protecting window drafts. If damaged, pop all air bubbles and deposit with flexible Low-Density Polyethylene (LDPE #4) film drop-offs at supermarkets rather than curbside bins.', 
            reason: 'Thin flexible plastic film tangles inside municipal sorting belts, halting heavy recycling machinery and risking worker injury.',
            avoid: 'Never throw inflated bubble pillows into general paper recycling.',
            topic: 'Packaging & Plastics',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_10',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_2', 
            query: 'old charger', 
            keywords: ['charger', 'cable', 'wire', 'adapter', 'usb', 'lightning', 'cord', 'power adapter', 'electronics'],
            title: 'Where can I responsibly dispose of broken charging cables and power adapters?', 
            recommendation: 'Store in an indoor e-waste collection box. Drop off at authorized electronic brand take-back kiosks or municipal e-waste recycling drives for copper and gold recovery.', 
            reason: 'Charging cables contain valuable virgin copper wire and PVC insulation. When dumped in landfills, lead stabilizers leach into local soil.',
            avoid: 'Do not throw electronics cables in curbside dry or wet household waste bins.',
            topic: 'E-Waste Management',
            relatedTopicId: 'top_4',
            relatedProjectId: 'proj_14',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_3', 
            query: 'old clothes', 
            keywords: ['clothes', 'jeans', 'shirt', 'textile', 'fabric', 'dress', 'garment', 'denim', 't-shirt'],
            title: 'What is the best way to handle unwearable or worn-out clothes?', 
            recommendation: 'If in wearable condition, wash and donate locally or organize a clothing swap. If torn or unwearable, upcycle into cleaning rags, a no-sew denim tote bag, or drop at an industrial textile shredder.', 
            reason: 'Synthetic fabrics like polyester shed non-biodegradable microplastics. Reusing natural cotton keeps massive virtual water and land resources in productive circulation.',
            avoid: 'Do not throw torn textiles into standard trash where they will decompose into methane in landfills for decades.',
            topic: 'Sustainable Fashion',
            relatedTopicId: 'top_6',
            relatedProjectId: 'proj_3',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_4', 
            query: 'plastic bottles', 
            keywords: ['plastic', 'bottle', 'pet', 'beverage', 'water bottle', 'soda', 'container', 'polyethylene'],
            title: 'What should I do with empty plastic beverage bottles?', 
            recommendation: 'Rinse with a splash of water, crush flat to save transport space, screw the cap back on, and place in dry recyclables. Alternatively, upcycle into a self-watering herb planter.', 
            reason: 'Clean, unsoiled PET (#1) plastic is easily shredded into flakes and spun into high-grade recycled polyester fibers and new bottles.',
            avoid: 'Avoid putting dirty bottles filled with sweet food residues or cigarette butts into the recycling bin.',
            topic: 'Waste & Recycling',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_2',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_5', 
            query: 'cardboard boxes', 
            keywords: ['cardboard', 'box', 'delivery', 'packaging', 'shipping', 'carton', 'corrugated', 'paper'],
            title: 'How to dispose of shipping and delivery cardboard boxes?', 
            recommendation: 'Remove plastic tape and shipping labels, flatten the box completely, and bundle with dry paper recycling. Or cut and slot into a custom desk organizer.', 
            reason: 'Clean corrugated cardboard is one of the most readily recyclable materials with exceptionally high fiber recovery value.',
            avoid: 'Do not mix pizza boxes with heavy grease stains with clean dry cardboard.',
            topic: 'Waste Segregation',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_6', 
            query: 'batteries', 
            keywords: ['battery', 'batteries', 'cell', 'aa', 'aaa', 'alkaline', 'lithium', 'rechargeable', 'button cell', '9v'],
            title: 'How do I safely dispose of used household batteries?', 
            recommendation: 'Store in an insulated non-metal container. Tape the contact terminals of 9V and lithium batteries with clear tape to prevent short-circuits. Drop off at battery recycling kiosks or authorized e-waste depots.', 
            reason: 'Batteries contain corrosive heavy metals, zinc, and lithium that present severe fire hazards in collection trucks and toxic groundwater leaching if dumped.',
            avoid: 'Never dispose of batteries in general household waste bins or incinerate them in outdoor fires.',
            topic: 'E-Waste Management',
            relatedTopicId: 'top_4',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_7', 
            query: 'glass jars', 
            keywords: ['glass', 'jar', 'bottle', 'pickle', 'sauce', 'container', 'jam', 'mayo', 'glassware'],
            title: 'What is the best way to handle empty glass jars and bottles?', 
            recommendation: 'Wash with warm soapy water to remove food residue and labels. Glass can be reused indefinitely for pantry storage, DIY ambient lanterns, or deposited in clean dry glass recycling.', 
            reason: 'Glass is 100% recyclable indefinitely with zero loss in purity, saving roughly 30% of energy compared to manufacturing virgin glass from sand.',
            avoid: 'Do not mix broken drinking glasses, window panes, or mirrors with bottle glass because they melt at different temperatures.',
            topic: 'Waste & Recycling',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_4',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_8', 
            query: 'aluminum cans', 
            keywords: ['aluminum', 'can', 'tin', 'foil', 'soda', 'beverage', 'metal', 'drink', 'beer can'],
            title: 'How should aluminum beverage cans and clean tin foil be recycled?', 
            recommendation: 'Rinse briefly to eliminate sweet syrups or residues. Lightly crush cans to save space. Crumple clean aluminum foil into a tight ball (at least 2 inches wide) and deposit into dry metal recycling.', 
            reason: 'Recycling aluminum saves 95% of the energy needed to extract new metal from bauxite ore, making it the single most energy-efficient material to recycle.',
            avoid: 'Do not recycle foil coated with heavy burnt cheese, grease, or food chunks.',
            topic: 'Waste & Recycling',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_6',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_9', 
            query: 'greasy pizza boxes', 
            keywords: ['pizza', 'box', 'grease', 'oil', 'food container', 'takeout', 'soiled', 'delivery box'],
            title: 'Can a greasy pizza box be put in paper recycling?', 
            recommendation: 'Tear the box in half: the clean top lid goes into dry cardboard recycling. The greasy, cheese-stained bottom must go into the wet compost or organic waste stream.', 
            reason: 'Food oils bind to paper pulp during industrial processing, preventing paper fibers from bonding and spoiling entire batches of recycled paper.',
            avoid: 'Never throw the oil-soaked portion into clean paper recycling bins.',
            topic: 'Waste Segregation',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_1'
        },
        { 
            id: 'dec_10', 
            query: 'tetra pak cartons', 
            keywords: ['tetra', 'pak', 'milk', 'juice', 'carton', 'aseptic', 'soy milk', 'drink box', 'beverage carton'],
            title: 'How do I dispose of milk and juice Tetra Pak cartons?', 
            recommendation: 'Unfold the corners, rinse out remaining liquid, flatten completely, screw the plastic cap on, and place in dry recyclables for specialized carton recycling facilities.', 
            reason: 'Tetra Paks are composite materials (75% paperboard, 20% polyethylene, 5% aluminum) separated by hydrapulpers to create paper and waterproof eco-boards.',
            avoid: 'Do not throw cartons with leftover curdled milk into recycling as it causes bacterial stench.',
            topic: 'Waste & Recycling',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_11', 
            query: 'styrofoam packaging', 
            keywords: ['styrofoam', 'thermocol', 'eps', 'foam', 'packing', 'cushioning', 'polystyrene'],
            title: 'What should I do with thermocol and styrofoam packaging?', 
            recommendation: 'Keep intact and reuse as protective packing for shipping or storage. Inquire with local appliance stores or drop at specialized expanded polystyrene (EPS) densifier centers.', 
            reason: 'Styrofoam is 95% air and takes up disproportionate landfill volume while persisting for over 500 years and fragmenting into wildlife-choking micro-beads.',
            avoid: 'Never burn styrofoam—it releases toxic styrene gas and black carcinogenic soot.',
            topic: 'Waste & Plastics',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_12', 
            query: 'coffee grounds', 
            keywords: ['coffee', 'grounds', 'espresso', 'filter coffee', 'brew', 'organic', 'compost', 'beans'],
            title: 'How should used coffee grounds and tea leaves be utilized?', 
            recommendation: 'Mix used grounds directly into home compost piles as nitrogen-rich "green" organic material, or sprinkle lightly on garden soil around acid-loving plants like tomatoes, roses, and ferns.', 
            reason: 'Coffee grounds contain approximately 2% nitrogen by volume plus trace potassium and magnesium that enrich soil structure without synthetic fertilizers.',
            avoid: 'Do not dump large thick cakes of damp coffee grounds in thick piles without mixing; it can mold into a water-repellent crust.',
            topic: 'Organic Waste & Composting',
            relatedTopicId: 'top_5',
            relatedProjectId: 'proj_2',
            relatedMissionId: 'm_8'
        },
        { 
            id: 'dec_13', 
            query: 'expired medicine', 
            keywords: ['medicine', 'pills', 'tablets', 'syrup', 'drugs', 'pharma', 'antibiotics', 'prescription'],
            title: 'How do I safely get rid of expired prescription tablets and syrups?', 
            recommendation: 'Return expired pharmaceuticals to participating hospital/pharmacy take-back bins. If unavailable, mix crushed tablets with unpalatable waste like coffee grounds in a sealed pouch and place in sanitary landfill trash.', 
            reason: 'Flushing medications down sinks or toilets contaminates municipal water tables and rivers, disrupting aquatic endocrine systems and fostering antibiotic resistance.',
            avoid: 'Never flush liquid medicines or pills down the toilet or sink drain.',
            topic: 'Hazardous Waste',
            relatedTopicId: 'top_17',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_14', 
            query: 'used cooking oil', 
            keywords: ['oil', 'cooking oil', 'grease', 'fryer', 'fat', 'lard', 'ghee', 'frying oil'],
            title: 'What should I do with leftover cooking oil after deep frying?', 
            recommendation: 'Let oil cool, strain through a mesh into a clean glass jar, and reuse 1-2 times. For disposal, collect in a sealed container for biodiesel recycling or soak up with sawdust/newspapers for solid organic disposal.', 
            reason: 'Pouring oil down drains creates massive underground "fatbergs" that block city sewers, while coating wastewater with oxygen-depleting oil slicks.',
            avoid: 'Never pour warm oil down the kitchen sink drain or onto outdoor lawns.',
            topic: 'Hazardous Waste & Water',
            relatedTopicId: 'top_17',
            relatedProjectId: 'proj_4',
            relatedMissionId: 'm_1'
        },
        { 
            id: 'dec_15', 
            query: 'broken light bulbs', 
            keywords: ['bulb', 'light bulb', 'cfl', 'tube light', 'led', 'incandescent', 'lamp', 'fluorescent'],
            title: 'How to dispose of burnt-out LED and CFL spiral light bulbs?', 
            recommendation: 'Wrap burnt bulbs securely in newspaper or cardboard to protect handlers. LEDs go into electronic waste; CFLs and fluorescent tubes contain mercury and must be taken to hazardous e-waste collection kiosks.', 
            reason: 'CFL bulbs contain trace toxic mercury vapor. LEDs contain circuit boards and aluminum heat sinks that can be recovered by e-waste recyclers.',
            avoid: 'Do not throw fluorescent tubes into standard glass recycling bins.',
            topic: 'Hazardous Waste & Energy',
            relatedTopicId: 'top_4',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_16', 
            query: 'worn shoes', 
            keywords: ['shoes', 'sneakers', 'footwear', 'boots', 'sandals', 'leather', 'rubber soles', 'slippers'],
            title: 'What should be done with old, unwearable sneakers and shoes?', 
            recommendation: 'Donate wearable pairs to community shelters. For completely worn-out athletic shoes, drop them off at dedicated brand recycling collection bins (e.g. Nike Reuse-A-Shoe) that grind rubber into playground turf.', 
            reason: 'Shoes combine leather, vulcanized rubber, foam, and adhesives that take up to 1,000 years to break down in standard landfills.',
            avoid: 'Do not burn worn-out synthetic rubber shoes.',
            topic: 'Sustainable Fashion',
            relatedTopicId: 'top_6',
            relatedProjectId: 'proj_3',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_17', 
            query: 'broken gadgets', 
            keywords: ['gadget', 'phone', 'laptop', 'tablet', 'screen', 'keyboard', 'mouse', 'printer', 'electronics'],
            title: 'How to handle broken phones, laptops, and computer peripherals?', 
            recommendation: 'Wipe all personal data with a factory reset. Take advantage of manufacturer trade-in programs, or drop off at authorized e-waste dismantlers for precious metals (gold, palladium, copper) recovery.', 
            reason: 'Recycling 1 million smartphones recovers roughly 34 kg of gold, 350 kg of silver, and 16,000 kg of copper, preventing massive mining destruction.',
            avoid: 'Never throw electronics into general household bins or smash screens.',
            topic: 'E-Waste Management',
            relatedTopicId: 'top_4',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_18', 
            query: 'plastic shopping bags', 
            keywords: ['plastic bag', 'polybag', 'carry bag', 'grocery bag', 'thin plastic', 'film', 'polythene'],
            title: 'How to deal with thin plastic grocery carry bags?', 
            recommendation: 'Reuse bags as small bin liners or for cleaning pet waste. Clean, dry plastic film bags can be bundled and returned to retail store film drop-off bins for composite lumber recycling.', 
            reason: 'Thin plastic bags fly easily in the wind, clogging storm drains, causing urban flooding, and choking marine life when washed into waterways.',
            avoid: 'Do not place loose single plastic bags into curbside automated sorting bins.',
            topic: 'Plastics & Oceans',
            relatedTopicId: 'top_7',
            relatedProjectId: 'proj_3',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_19', 
            query: 'old newspapers', 
            keywords: ['newspaper', 'magazines', 'pamphlets', 'paper', 'newsprint', 'scrap paper', 'books'],
            title: 'What is the best way to handle old newspapers and magazines?', 
            recommendation: 'Bundle clean dry newsprint and sell or hand over to local paper recyclers (kabadiwala). Or upcycle into biodegradable seed pots, cleaning glass, or organic garden weed barriers.', 
            reason: 'Recycled newsprint consumes 70% less energy and water than producing virgin wood pulp paper and preserves mature forests.',
            avoid: 'Do not recycle paper soaked in food grease or engine oils.',
            topic: 'Paper & Circularity',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_5',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_20', 
            query: 'cosmetics and lotion bottles', 
            keywords: ['cosmetics', 'shampoo', 'lotion', 'makeup', 'cream', 'skincare', 'perfume', 'deodorant'],
            title: 'How to dispose of empty plastic and glass cosmetic bottles?', 
            recommendation: 'Scrape out remaining cream, rinse thoroughly with warm water, and separate plastic pump nozzles from glass bottles. Glass goes to glass recycling; rigid bottles go to dry plastic streams.', 
            reason: 'Pump nozzles contain internal metal springs and multiple resin types that require manual disassembly before shredding.',
            avoid: 'Do not put full bottles with chemical lotions into the dry recycling stream.',
            topic: 'Plastics & Recycling',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_4',
            relatedMissionId: 'm_3'
        },
        { 
            id: 'dec_21', 
            query: 'paints and thinners', 
            keywords: ['paint', 'thinner', 'solvent', 'varnish', 'turpentine', 'enamel', 'primer', 'chemicals'],
            title: 'What should I do with leftover paint cans and chemical solvents?', 
            recommendation: 'If water-based latex paint, leave the lid off in a well-ventilated area until completely hardened, then dispose as solid waste. Oil-based paints and thinners must be taken to hazardous waste collection depots.', 
            reason: 'Liquid solvents release toxic Volatile Organic Compounds (VOCs), contaminate groundwater, and are highly combustible in collection trucks.',
            avoid: 'Never pour liquid paints or paint thinners down the household sink or storm drain.',
            topic: 'Hazardous Waste',
            relatedTopicId: 'top_17',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_5'
        },
        { 
            id: 'dec_22', 
            query: 'eggshells', 
            keywords: ['eggshell', 'egg', 'calcium', 'shells', 'organic', 'compost', 'kitchen scrap', 'fertilizer'],
            title: 'How to responsibly handle kitchen eggshells?', 
            recommendation: 'Rinse briefly, crush into fine fragments, and add to your home compost pile or mix directly into potting soil for tomatoes and peppers.', 
            reason: 'Eggshells are 95% calcium carbonate, a vital macronutrient that strengthens plant cell walls and prevents blossom end rot in vegetables.',
            avoid: 'Do not throw large uncrushed eggshell halves directly into potted soil without crushing; they take years to break down intact.',
            topic: 'Organic Waste & Composting',
            relatedTopicId: 'top_5',
            relatedProjectId: 'proj_7',
            relatedMissionId: 'm_8'
        },
        { 
            id: 'dec_23', 
            query: 'broken ceramic plates', 
            keywords: ['ceramic', 'plate', 'mug', 'cup', 'porcelain', 'clay', 'pottery', 'tile'],
            title: 'What to do with broken ceramic mugs, clay pots, and porcelain dishes?', 
            recommendation: 'Crush into small 1-inch gravel fragments and place at the bottom of plant pots as effective drainage grit. If unrepairable, dispose in general non-recyclable solid waste.', 
            reason: 'Ceramics are fired clay with high melting points that cannot be melted in standard glass bottle recycling furnaces.',
            avoid: 'Never mix broken ceramic crockery into municipal glass bottle recycling bins.',
            topic: 'Waste Segregation',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_2',
            relatedMissionId: 'm_1'
        },
        { 
            id: 'dec_24', 
            query: 'old toothbrushes', 
            keywords: ['toothbrush', 'bristle', 'oral care', 'toothpaste', 'plastic toothbrush', 'brush'],
            title: 'How should old plastic toothbrushes be repurposed or discarded?', 
            recommendation: 'Sanitize in boiling water and repurpose as heavy-duty cleaning tools for tile grout, bicycle chains, keyboard crevices, or shoe soles. For future purchases, switch to 100% compostable bamboo toothbrushes.', 
            reason: 'Standard toothbrushes combine nylon bristles with hard polypropylene and rubber grips, making them virtually impossible to mechanically recycle.',
            avoid: 'Do not put plastic toothbrushes into curbside container recycling bins.',
            topic: 'Plastic & Waste',
            relatedTopicId: 'top_1',
            relatedProjectId: 'proj_1',
            relatedMissionId: 'm_3'
        }
    ];

    if (typeof window !== 'undefined') {
        window.EcoDecisionsData = decisions;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = decisions;
    }
})();
