const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const dataJsPath = path.join(rootDir, 'data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const script = new vm.Script(dataJsContent + '; siteData;');
const siteData = script.runInNewContext();

const redirects = [];

for (const [branchKey, branchData] of Object.entries(siteData)) {
    if (branchKey === 'firstyear') continue; // First year has a completely different structure now, usually it was just /firstyear/slug.html but let's handle it if needed. Handling 5 main branches is 95% of the traffic.

    if (branchData.semesters) {
        branchData.semesters.forEach(sem => {
            const semUrlPart = sem.url || `semester-${sem.number}`;
            if (sem.subjects) {
                sem.subjects.forEach(sub => {
                    if (sub.slug) {
                        const oldUrl = `/${branchKey}/${sub.slug}.html`;
                        const newUrl = `/${branchKey}/${semUrlPart}/${sub.slug}/`;
                        
                        redirects.push({
                            source: oldUrl,
                            destination: newUrl,
                            permanent: true
                        });
                        
                        // Also redirect the version without .html just in case they linked it somewhere
                        redirects.push({
                            source: `/${branchKey}/${sub.slug}`,
                            destination: newUrl,
                            permanent: true
                        });
                    }
                });
            }
        });
    }
}

// First year handling mapping old to new if possible
if (siteData.firstyear && siteData.firstyear.schemes) {
    siteData.firstyear.schemes.forEach(scheme => {
        if (scheme.cycles) {
            scheme.cycles.forEach(cycle => {
                const cycleSlug = cycle.slug; // p-cycle, c-cycle
                const schemeSlug = scheme.slug; // 25-scheme, 22-scheme
                if (cycle.subjects) {
                    cycle.subjects.forEach(sub => {
                        if (sub.slug) {
                            const oldUrl = `/firstyear/${sub.slug}.html`;
                            const newUrl = `/first-year/${schemeSlug}/${cycleSlug}/${sub.slug}/`;
                            
                            redirects.push({
                                source: oldUrl,
                                destination: newUrl,
                                permanent: true
                            });
                            redirects.push({
                                source: `/first-year/${sub.slug}.html`,
                                destination: newUrl,
                                permanent: true
                            });
                        }
                    });
                }
            });
        }
    });
}

// Ensure 301 redirects from root .html pages if any exist and need cleaning explicitly
// Not strictly necessary due to cleanUrls, but good for custom maps.

const vercelConfig = {
  cleanUrls: true,
  trailingSlash: false, // The user requested NO trailing slash for blogs, and current subject pages will just serve folder index.html fine.
  redirects: redirects
};

fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));

console.log(`Successfully generated vercel.json with cleanUrls and ${redirects.length} redirects.`);
