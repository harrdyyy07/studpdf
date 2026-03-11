/**
 * Centralized Search for vtuwise
 */
const Search = {
    init: () => {
        const searchInput = document.getElementById('site-search');
        const resultsContainer = document.getElementById('search-results');

        if (!searchInput || !resultsContainer) return;

        // Clear previous listeners if any (by replacing the element or just being careful)
        // Here we just attach if not already attached
        if (searchInput.dataset.initialized) return;
        searchInput.dataset.initialized = "true";

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 1) {
                resultsContainer.innerHTML = '';
                return;
            }

            const results = Search.performSearch(query);
            Search.displayResults(results, resultsContainer);
        });
    },

    performSearch: (query) => {
        const results = [];
        // siteData is global from data.js
        if (typeof siteData === 'undefined') return results;

        for (const branchKey in siteData) {
            const branch = siteData[branchKey];
            if (branch.semesters) {
                branch.semesters.forEach(sem => {
                    sem.subjects.forEach(sub => {
                        if (sub.name.toLowerCase().includes(query) || sub.code.toLowerCase().includes(query)) {
                            results.push({
                                title: sub.name,
                                path: `${branch.title} > Sem ${sem.sem}`,
                                url: Search.getRelativeUrl(branchKey, sem.sem, sub.slug),
                                type: 'Subject'
                            });
                        }
                    });
                });
            } else if (branch.schemes) {
                branch.schemes.forEach(scheme => {
                    scheme.cycles.forEach(cycle => {
                        cycle.subjects.forEach(sub => {
                            if (sub.name.toLowerCase().includes(query) || sub.code.toLowerCase().includes(query)) {
                                results.push({
                                    title: sub.name,
                                    path: `${branch.title} > ${scheme.name} > ${cycle.name}`,
                                    url: Search.getFirstYearUrl(scheme.slug, cycle.slug, sub.slug),
                                    type: 'Subject'
                                });
                            }
                        });
                    });
                });
            }
        }
        return results.slice(0, 8); // Limit to 8 results
    },

    getPrefix: () => {
        let prefix = "";
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && (src.endsWith('/search.js') || src === 'search.js')) {
                prefix = src.replace(/search\.js$/, '');
                break;
            }
        }
        return prefix;
    },

    getRelativeUrl: (branch, sem, slug) => {
        const prefix = Search.getPrefix();

        // Map branch key to folder name
        const branchFolders = {
            'firstyear': 'first-year',
            'cse': 'cse',
            'ece': 'ece',
            'eee': 'eee',
            'mech': 'mech',
            'civil': 'civil'
        };

        const folder = branchFolders[branch] || branch;
        return `${prefix}${folder}/semester-${sem}/${slug}/index.html`;
    },

    getFirstYearUrl: (scheme, cycle, slug) => {
        const prefix = Search.getPrefix();
        return `${prefix}first-year/${scheme}/${cycle}/${slug}/index.html`;
    },

    displayResults: (results, container) => {
        if (results.length === 0) {
            container.innerHTML = '<div style="padding: 1rem; color: var(--text-muted); text-align: center;">No results found.</div>';
        } else {
            container.innerHTML = results.map(res => `
                <a href="${res.url}" class="search-result-item">
                    <div class="search-result-title">${res.title}</div>
                    <div class="search-result-path">${res.path}</div>
                </a>
            `).join('');
        }
        container.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', Search.init);
