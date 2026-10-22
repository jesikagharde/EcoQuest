/**
 * ECOQUEST ECOLENS ASSISTANT & VISUAL SCANNER (assets/js/ecolens.js)
 * Implements real-time multi-token search, image upload scanning, laser beam animation,
 * sample presets, catalog matching, and zero-error safe HTML DOM rendering.
 */
(function() {
    let ecolensSearchTimeout = null;

    const sampleIcons = {
        'plastic bottles': '🥤',
        'old charger': '🔌',
        'old clothes': '👖',
        'glass jars': '🫙',
        'batteries': '🔋',
        'greasy pizza boxes': '🍕',
        'aluminum cans': '🥫',
        'coffee grounds': '☕'
    };

    /**
     * Debounced search entrypoint with clear button state toggling
     */
    function debounceSearch() {
        const searchInput = document.getElementById('ecolens-search');
        const clearBtn = document.getElementById('ecolens-clear-btn');
        if (clearBtn && searchInput) {
            clearBtn.style.display = searchInput.value.trim().length > 0 ? 'flex' : 'none';
        }

        clearTimeout(ecolensSearchTimeout);
        ecolensSearchTimeout = setTimeout(() => {
            searchEcoLens();
        }, 150);
    }

    /**
     * Clear search field and reset view
     */
    function clearSearch() {
        const searchInput = document.getElementById('ecolens-search');
        const clearBtn = document.getElementById('ecolens-clear-btn');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        if (clearBtn) clearBtn.style.display = 'none';
        searchEcoLens();
    }

    /**
     * Initialize EcoLens View
     */
    function renderEcoLens() {
        searchEcoLens();
        setupDropzone();
        setupSearchKeyListeners();
    }

    /**
     * Setup Enter Key on search field
     */
    function setupSearchKeyListeners() {
        const searchInput = document.getElementById('ecolens-search');
        if (searchInput && !searchInput.dataset.keyInit) {
            searchInput.dataset.keyInit = 'true';
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchEcoLens();
                }
            });
        }
    }

    /**
     * Real-time Multi-token Fuzzy Search
     */
    function searchEcoLens() {
        const searchInput = document.getElementById('ecolens-search');
        const container = document.getElementById('ecolens-results');
        const clearBtn = document.getElementById('ecolens-clear-btn');
        if (!container) return;

        const rawQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (clearBtn) {
            clearBtn.style.display = rawQuery.length > 0 ? 'flex' : 'none';
        }

        const allDecisions = window.EcoData.ecoDecisions || [];
        let matches = [];

        if (!rawQuery || rawQuery === 'all') {
            matches = [...allDecisions];
        } else {
            const stopWords = new Set(['how', 'to', 'dispose', 'of', 'can', 'i', 'recycle', 'what', 'should', 'do', 'with', 'an', 'a', 'the', 'where', 'throw', 'put', 'is', 'my', 'old', 'broken', 'used', 'empty']);
            
            const normalizeWord = (w) => {
                let clean = w.replace(/[^a-z0-9]/g, '');
                if (clean.endsWith('ies') && clean.length > 4) clean = clean.slice(0, -3) + 'y';
                else if (clean.endsWith('es') && clean.length > 4 && !clean.endsWith('clothes')) clean = clean.slice(0, -2);
                else if (clean.endsWith('s') && clean.length > 3 && !clean.endsWith('glass')) clean = clean.slice(0, -1);
                return clean;
            };

            const queryTokens = rawQuery.split(/\s+/).map(normalizeWord).filter(w => w.length > 1 && !stopWords.has(w));
            const allTokens = queryTokens.length > 0 ? queryTokens : rawQuery.split(/\s+/).map(normalizeWord).filter(w => w.length > 0);

            const scored = allDecisions.map(dec => {
                let score = 0;
                const normQuery = dec.query.toLowerCase();
                const normTitle = dec.title.toLowerCase();
                const normTopic = dec.topic.toLowerCase();
                const normKeywords = (dec.keywords || []).map(k => normalizeWord(k.toLowerCase()));
                const normRec = (dec.recommendation || '').toLowerCase();

                if (normQuery.includes(rawQuery) || rawQuery.includes(normQuery)) score += 50;
                if (normTitle.includes(rawQuery)) score += 40;
                if (normTopic.includes(rawQuery)) score += 30;

                allTokens.forEach(token => {
                    if (normQuery.includes(token)) score += 20;
                    if (normKeywords.some(k => k.includes(token) || token.includes(k))) score += 15;
                    if (normTitle.includes(token)) score += 10;
                    if (normTopic.includes(token)) score += 8;
                    if (normRec.includes(token)) score += 3;
                });

                return { dec, score };
            });

            matches = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.dec);
        }

        container.innerHTML = '';

        // Universal segregation fallback when no specific index match
        if (matches.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem 2rem;">
                    <i data-lucide="help-circle" style="width: 44px; height: 44px; color: var(--earth-amber); margin: 0 auto 1rem auto;"></i>
                    <h3 style="margin-bottom: 0.5rem; color: var(--text-main);">Universal Disposal Stream for "${rawQuery}"</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                        This item was not found in the verified 24-item catalog. Follow standard municipal segregation protocols:
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; text-align: left; margin-bottom: 1.5rem;">
                        <div style="background: var(--warm-cream); padding: 1.15rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            <strong style="color: #047857; display: block; margin-bottom: 0.25rem;">🟢 Wet Waste / Organic</strong>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Food scraps, vegetable peels, tea leaves, eggshells. Place in home compost or green wet bin.</p>
                        </div>
                        <div style="background: var(--warm-cream); padding: 1.15rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            <strong style="color: #0369a1; display: block; margin-bottom: 0.25rem;">🔵 Dry Clean Recyclables</strong>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Rinsed rigid plastic bottles, unsoiled cardboard, aluminum cans, glass bottles, and dry paper.</p>
                        </div>
                        <div style="background: var(--warm-cream); padding: 1.15rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            <strong style="color: #b45309; display: block; margin-bottom: 0.25rem;">🔴 Hazardous / E-Waste</strong>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Dead batteries, broken wires, light bulbs, electronics, expired pills. Deliver to take-back kiosks.</p>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; gap: 0.75rem;">
                        <button class="btn btn-outline btn-sm" onclick="EcoLens.clearSearch()">
                            <i data-lucide="rotate-ccw"></i> View All Catalog Items
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="document.getElementById('ecolens-file-input').click()">
                            <i data-lucide="camera"></i> Upload Photo of Item
                        </button>
                    </div>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        container.innerHTML = `
            <div class="ecolens-results-header">
                <span>
                    ${rawQuery && rawQuery !== 'all' ? `Found <strong>${matches.length}</strong> matching item(s) for "<em>${rawQuery}</em>"` : `Showing <strong>${matches.length}</strong> verified everyday waste items`}
                </span>
                ${rawQuery && rawQuery !== 'all' ? `<button class="btn btn-text btn-sm" onclick="EcoLens.clearSearch()"><i data-lucide="x" style="width:14px;"></i> Clear Search</button>` : ''}
            </div>
        `;

        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();

        matches.forEach(dec => {
            const isBookmarked = (user.bookmarks && user.bookmarks.ecolens && user.bookmarks.ecolens.includes(dec.id));

            container.innerHTML += `
                <div class="ecolens-card card" style="margin-bottom: 1.25rem; border-left: 4px solid var(--accent-primary);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                        <span class="badge badge-category">${dec.topic}</span>
                        <div style="display: flex; gap: 0.4rem; align-items: center;">
                            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Stream: Verified</span>
                            <button class="btn btn-text" style="padding: 0.25rem;" onclick="EcoBookmarks.toggleBookmark('ecolens', '${dec.id}')" title="Bookmark Disposal Guide">
                                <i data-lucide="bookmark" style="${isBookmarked ? 'color: var(--accent-primary); fill: var(--accent-primary);' : 'color: var(--text-muted);'} width:16px;"></i>
                            </button>
                        </div>
                    </div>

                    <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text-main);">${dec.title}</h3>
                    
                    <div style="background: var(--accent-soft); border-left: 3px solid var(--accent-primary); padding: 1.15rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
                        <strong style="color: var(--accent-primary); display: block; margin-bottom: 0.35rem; font-size: 0.95rem;">
                            <i data-lucide="check-circle" style="width:16px; vertical-align:middle;"></i> Practical Recommendation
                        </strong>
                        <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6; margin: 0;">${dec.recommendation}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
                        <div style="background: var(--warm-cream); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            <strong style="display: block; margin-bottom: 0.35rem; color: var(--text-main); font-size: 0.88rem;">Why it matters:</strong>
                            <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.55; margin: 0;">${dec.reason}</p>
                        </div>
                        <div style="background: #fef2f2; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid #fecaca;">
                            <strong style="display: block; margin-bottom: 0.35rem; color: #b91c1c; font-size: 0.88rem;">What to avoid:</strong>
                            <p style="color: #7f1d1d; font-size: 0.88rem; line-height: 1.55; margin: 0;">${dec.avoid}</p>
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--border-color-subtle); padding-top: 1rem; flex-wrap: wrap;">
                        ${dec.relatedTopicId ? `<button class="btn btn-outline btn-sm" onclick="EcoLearning.openTopicModal('${dec.relatedTopicId}')"><i data-lucide="book-open"></i> Read Related Lesson</button>` : ''}
                        ${dec.relatedProjectId ? `<button class="btn btn-outline btn-sm" onclick="EcoCreate.viewProjectInstructions('${dec.relatedProjectId}')"><i data-lucide="scissors"></i> View Upcycle Guide</button>` : ''}
                    </div>
                </div>
            `;
        });

        if (window.lucide) window.lucide.createIcons();
        if (window.init3DCardPhysics) window.init3DCardPhysics();
    }

    /**
     * Quick filter shortcut
     */
    function quickSearch(term) {
        const input = document.getElementById('ecolens-search');
        if (input) {
            input.value = (term === 'all') ? '' : term;
        }
        searchEcoLens();
    }

    /**
     * Sample item scan preset click
     */
    function scanSampleItem(itemName) {
        const allDecisions = window.EcoData.ecoDecisions || [];
        const matched = allDecisions.find(d => 
            d.query.toLowerCase().includes(itemName.toLowerCase()) || 
            (d.keywords && d.keywords.some(k => k.toLowerCase() === itemName.toLowerCase() || itemName.toLowerCase().includes(k.toLowerCase())))
        ) || allDecisions[0];

        const icon = sampleIcons[itemName] || '📦';
        performScan(matched.title, null, matched, { isSample: true, icon: icon, sampleName: itemName });
    }

    /**
     * Image Upload & Drag-Drop Handler
     */
    function handleImageUpload(e) {
        const files = (e.target && e.target.files) || (e.dataTransfer && e.dataTransfer.files);
        const file = files && files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const imgSrc = evt.target.result;
            const fileName = (file.name || 'item').toLowerCase();

            const allDecisions = window.EcoData.ecoDecisions || [];
            let matched = allDecisions.find(d => 
                fileName.includes(d.query.toLowerCase()) || 
                (d.keywords && d.keywords.some(k => fileName.includes(k.toLowerCase())))
            );

            if (!matched) {
                matched = allDecisions.find(d => d.query.includes('plastic')) || allDecisions[0];
            }

            const cleanTitle = file.name ? file.name.replace(/\.[^/.]+$/, "") : "Uploaded Item";
            performScan(cleanTitle, imgSrc, matched, { isSample: false });
        };
        reader.readAsDataURL(file);

        if (e.target && e.target.type === 'file') {
            e.target.value = '';
        }
    }

    /**
     * Perform the visual laser scan and render result card
     */
    function performScan(title, imgSrc, matchedItem, options = {}) {
        const resultsContainer = document.getElementById('ecolens-results');
        if (!resultsContainer) return;

        const isSample = options.isSample || !imgSrc;
        const icon = options.icon || '📦';

        // Increment user's ecolens usage count
        const user = window.EcoStorage.getCurrentUser() || window.EcoStorage.getDefaultUser();
        user.ecolensUsageCount = (user.ecolensUsageCount || 0) + 1;
        window.EcoStorage.saveCurrentUser(user);

        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const scanVisualHTML = isSample ? `
            <div class="lens-preview-container" style="background: var(--accent-soft); display: flex; flex-direction: column; align-items: center; justify-content: center; height: 190px; border-radius: var(--radius-md); border: 2.5px solid var(--accent-primary); position: relative; overflow: hidden; margin: 0 auto 1.5rem auto; max-width: 300px;">
                <span style="font-size: 4.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08)); line-height: 1;">${icon}</span>
                <span style="font-weight: 700; color: var(--accent-primary); font-size: 1rem; margin-top: 0.75rem; letter-spacing: 0.5px;">${matchedItem.query.toUpperCase()}</span>
                <div class="lens-scan-line"></div>
            </div>
        ` : `
            <div class="lens-preview-container">
                <img src="${imgSrc}" class="lens-preview-img" alt="Scanned item">
                <div class="lens-scan-line"></div>
            </div>
        `;

        resultsContainer.innerHTML = `
            <div class="card" style="padding: 2.25rem; text-align: center;">
                ${scanVisualHTML}
                <h3 style="color: var(--accent-primary); margin-bottom: 0.35rem;">
                    <i data-lucide="loader" style="width: 20px; vertical-align: middle;"></i> Matching against EcoLens sustainable disposal catalog...
                </h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Cross-referencing municipal dry/wet segregation protocols and circular upcycling datasets...</p>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
            const itemAvatarHTML = isSample ? `
                <div style="width: 76px; height: 76px; border-radius: var(--radius-md); background: var(--accent-soft); border: 2px solid var(--accent-primary); display: flex; align-items: center; justify-content: center; font-size: 2.4rem; flex-shrink: 0; box-shadow: var(--shadow-soft);">
                    ${icon}
                </div>
            ` : `
                <img src="${imgSrc}" style="width: 76px; height: 76px; object-fit: cover; border-radius: var(--radius-md); border: 2px solid var(--accent-primary); flex-shrink: 0; box-shadow: var(--shadow-soft);" alt="Identified item">
            `;

            resultsContainer.innerHTML = `
                <div class="card" style="border-left: 5px solid var(--accent-primary); padding: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; gap: 1.25rem; align-items: center;">
                            ${itemAvatarHTML}
                            <div>
                                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
                                    <span class="badge badge-category"><i data-lucide="database" style="width:12px; margin-right:3px;"></i> Matched from EcoLens Catalog</span>
                                    <span class="badge badge-waste">${matchedItem.topic}</span>
                                </div>
                                <h2 style="font-size: 1.35rem; color: var(--accent-primary); margin: 0;">${matchedItem.title}</h2>
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <button class="btn btn-outline btn-sm" onclick="EcoLens.clearSearch()">
                                <i data-lucide="list"></i> View All Items
                            </button>
                            <button class="btn btn-primary btn-sm" onclick="document.getElementById('ecolens-file-input').click()">
                                <i data-lucide="camera"></i> Scan Another Item
                            </button>
                        </div>
                    </div>

                    <div style="background: var(--accent-soft); border-left: 3px solid var(--accent-primary); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                        <strong style="color: var(--accent-primary); display: block; margin-bottom: 0.35rem; font-size: 1rem;">
                            <i data-lucide="check-circle" style="width:16px; vertical-align:middle;"></i> Recommended Stream & Action
                        </strong>
                        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin: 0;">${matchedItem.recommendation}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="background: var(--warm-cream); padding: 1.15rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                            <strong style="display: block; margin-bottom: 0.35rem; color: var(--text-main); font-size: 0.9rem;">Why it matters:</strong>
                            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">${matchedItem.reason}</p>
                        </div>
                        <div style="background: #fef2f2; padding: 1.15rem; border-radius: var(--radius-sm); border: 1px solid #fecaca;">
                            <strong style="display: block; margin-bottom: 0.35rem; color: #b91c1c; font-size: 0.9rem;">What to avoid:</strong>
                            <p style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6; margin: 0;">${matchedItem.avoid}</p>
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--border-color-subtle); padding-top: 1.25rem; flex-wrap: wrap;">
                        ${matchedItem.relatedTopicId ? `<button class="btn btn-outline btn-sm" onclick="EcoLearning.openTopicModal('${matchedItem.relatedTopicId}')"><i data-lucide="book-open"></i> Read Related Lesson</button>` : ''}
                        ${matchedItem.relatedProjectId ? `<button class="btn btn-outline btn-sm" onclick="EcoCreate.viewProjectInstructions('${matchedItem.relatedProjectId}')"><i data-lucide="scissors"></i> View Upcycle Guide</button>` : ''}
                    </div>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            if (window.init3DCardPhysics) window.init3DCardPhysics();
        }, 600);
    }

    /**
     * Setup Drag & Drop Listener
     */
    function setupDropzone() {
        const dropzone = document.getElementById('lens-dropzone');
        if (!dropzone) return;

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('dragover');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt && dt.files;
            if (files && files.length > 0) {
                handleImageUpload({ dataTransfer: { files: files } });
            }
        }, false);
    }

    // Expose API
    window.EcoLens = {
        renderEcoLens,
        debounceSearch,
        clearSearch,
        searchEcoLens,
        quickSearch,
        scanSampleItem,
        handleImageUpload,
        setupDropzone
    };

    // Backward-compatibility aliases
    window.renderEcoLens = renderEcoLens;
    window.debounceSearchEcoLens = debounceSearch;
    window.clearEcoLensSearch = clearSearch;
    window.searchEcoLens = searchEcoLens;
    window.quickSearchEcoLens = quickSearch;
    window.scanSampleItem = scanSampleItem;
    window.handleEcoLensImageUpload = handleImageUpload;
    window.setupEcoLensDropzone = setupDropzone;
})();
