/**
 * Site-Wide Search Logic for StudPDF
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
        }
        return results.slice(0, 8); // Limit to 8 results
    },

    getRelativeUrl: (branch, sem, slug) => {
        // We need to know where we are to build the right relative path
        // For simplicity, let's use the same prefix logic as nav.js or just use absolute-like paths if we can
        // But since this is a static site, we'll try to determine the root

        const href = window.location.href;
        let prefix = "";
        if (href.includes('/first-year/semester-1/mathematics-for-cse/')) prefix = "../../../";
        else if (href.includes('/first-year/semester-1/')) prefix = "../../";
        else if (href.includes('/first-year/')) prefix = "../";
        else if (href.includes('/cse-computer-science/')) prefix = "../";
        else if (href.includes('/ece-electronics-communication/')) prefix = "../";
        else if (href.includes('/eee-electrical-electronics/')) prefix = "../";
        else if (href.includes('/mechanical-engineering/')) prefix = "../";
        else if (href.includes('/civil-engineering/')) prefix = "../";
        else if (href.includes('/calculators/') || href.includes('/legal/')) prefix = "../";

        // Map branch key to folder name
        const branchFolders = {
            'firstyear': 'first-year',
            'cse': 'cse-computer-science',
            'ece': 'ece-electronics-communication',
            'eee': 'eee-electrical-electronics',
            'mech': 'mechanical-engineering',
            'civil': 'civil-engineering'
        };

        const folder = branchFolders[branch] || branch;
        return `${prefix}${folder}/semester-${sem}/${slug}/index.html`;
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
