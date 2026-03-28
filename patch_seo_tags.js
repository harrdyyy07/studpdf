const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const dataJsPath = path.join(rootDir, 'data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const script = new vm.Script(dataJsContent + '; siteData;');
const siteData = script.runInNewContext();

const subjectsMap = {};

function flattenSubjects(data) {
    // Top level: { firstyear: {}, cse: {}, ece: {} }
    for (const [branchKey, branchData] of Object.entries(data)) {
        if (branchData.semesters) {
            branchData.semesters.forEach(sem => {
                if (sem.subjects) {
                    sem.subjects.forEach(sub => {
                        if (sub.slug) subjectsMap[sub.slug] = sub;
                    });
                }
            });
        }
        if (branchData.schemes) {
            branchData.schemes.forEach(scheme => {
                if (scheme.cycles) {
                    scheme.cycles.forEach(cycle => {
                        if (cycle.subjects) {
                            cycle.subjects.forEach(sub => {
                                if (sub.slug) subjectsMap[sub.slug] = sub;
                            });
                        }
                    });
                }
            });
        }
    }
}

flattenSubjects(siteData);

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDirs = ['cse', 'ece', 'eee', 'civil', 'mech', 'aiml', 'first-year'];
let filesChanged = 0;

targetDirs.forEach(targetDir => {
    const fullTargetDir = path.join(rootDir, targetDir);
    walkDir(fullTargetDir, filePath => {
        if (!filePath.endsWith('index.html')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip branch or semester index files that are structural.
        // We look for files where we dynamically look up by slug.
        // Slugs are usually the parent directory name.
        const pathParts = filePath.split(path.sep);
        const folderName = pathParts[pathParts.length - 2];
        const isStructural = ['cse', 'ece', 'eee', 'civil', 'mech', 'aiml', 'first-year', 'semester-3', 'semester-4', 'semester-5', 'semester-6', 'semester-7', 'semester-8', 'p-cycle', 'c-cycle', '25-scheme', '22-scheme'].includes(folderName);
        
        const subject = subjectsMap[folderName];
        if (!subject && isStructural) return; // Structural files and no generic subject mapping
        
        if (subject) {
            let modified = false;
            
            const subjectName = subject.name;
            const subjectCode = subject.code || "";
            const titlePart = `${subjectName} ${subjectCode ? `(${subjectCode}) ` : ''}Notes & Question Papers | vtuwise`;
            const descPart = `Download VTU ${subjectName} ${subjectCode ? `(${subjectCode}) ` : ''}notes, previous year question papers, syllabus, and study materials to excel in exams.`;
            
            // Generate friendly path for canonical
            const relativePath = path.relative(rootDir, path.dirname(filePath));
            const posixPath = relativePath.split(path.sep).join('/');
            const canonicalUrl = `https://vtuwise.in/${posixPath}/`;

            // Replace Title
            const titlePattern = /<title>.*?<\/title>/;
            if (titlePattern.test(content)) {
                content = content.replace(titlePattern, `<title>${titlePart}</title>`);
                modified = true;
            } else if (content.includes('</head>')) {
                // If no title tag exists, insert one
                content = content.replace('</head>', `    <title>${titlePart}</title>\n</head>`);
                modified = true;
            }

            // Replace Description
            const metaDescPattern = /<meta name="description" content=".*?">/;
            if (metaDescPattern.test(content)) {
                content = content.replace(metaDescPattern, `<meta name="description" content="${descPart}">`);
                modified = true;
            } else if (content.includes('</head>')) {
                 content = content.replace('</head>', `    <meta name="description" content="${descPart}">\n</head>`);
                 modified = true;
            }

            // Replace Canonical
            const canonicalPattern = /<link rel="canonical" href=".*?">/;
            if (canonicalPattern.test(content)) {
                if (!content.match(`<link rel="canonical" href="${canonicalUrl}">`)) {
                    content = content.replace(canonicalPattern, `<link rel="canonical" href="${canonicalUrl}">`);
                    modified = true;
                }
            } else if (content.includes('</head>')) {
                content = content.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}">\n</head>`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                filesChanged++;
                console.log("Patched SEO tags for:", canonicalUrl);
            }
        }
    });
});

console.log("Total files SEO-patched:", filesChanged);
