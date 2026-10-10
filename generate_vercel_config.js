const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const notesDataPath = path.join(rootDir, 'web', 'src', 'data', 'notesData.ts');
let notesDataContent = fs.readFileSync(notesDataPath, 'utf8');

// Strip TypeScript interfaces and export statement
notesDataContent = notesDataContent.replace(/export\s+interface[\s\S]*?export\s+const\s+siteData:\s*SiteData\s*=\s*/, 'const siteData = ');

const script = new vm.Script(notesDataContent + '; siteData;');
const siteData = script.runInNewContext();

const redirects = [];

for (const [branchKey, branchData] of Object.entries(siteData)) {
    if (branchKey === 'firstyear') continue; // First year has a completely different structure now, usually it was just /firstyear/slug.html but let's handle it if needed. Handling 5 main branches is 95% of the traffic.

    if (branchData.semesters) {
        branchData.semesters.forEach(sem => {
            const semNum = sem.sem !== undefined ? sem.sem : sem.number;
            if (sem.subjects && semNum) {
                sem.subjects.forEach(sub => {
                    if (sub.slug) {
                        const oldUrl = `/${branchKey}/${sub.slug}.html`;
                        const newUrl = `/${branchKey}/${semNum}/${sub.slug}`;
                        
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

// First year handling mapping old to new
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
                            const newUrl = `/firstyear/${schemeSlug}/${cycleSlug}/${sub.slug}`;
                            
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
                            redirects.push({
                                source: `/first-year/${sub.slug}`,
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

const vercelConfig = {
  cleanUrls: true,
  trailingSlash: false,
  redirects: redirects
};

fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
const webVercelPath = path.join(rootDir, 'web', 'vercel.json');
if (fs.existsSync(path.join(rootDir, 'web'))) {
  fs.writeFileSync(webVercelPath, JSON.stringify(vercelConfig, null, 2));
}

console.log(`Successfully generated vercel.json with cleanUrls and ${redirects.length} redirects.`);
