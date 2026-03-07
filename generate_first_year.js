const fs = require('fs');
const path = require('path');

// Read data.js
const dataJsPath = path.join(__dirname, 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// Extract the siteData object string
const startIndex = dataJsContent.indexOf('const siteData = ') + 'const siteData = '.length;
let objStr = dataJsContent.substring(startIndex);

// Remove the trailing semicolon and any extra whitespace at the end
objStr = objStr.trim().replace(/;$/, '');

// Simple cleanup for parsing (assuming well-formed object)
objStr = objStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

// Evaluate to get the object securely
let siteData;
try {
    siteData = eval('(' + objStr + ')');
} catch (e) {
    console.error('Error parsing data.js:', e);
    process.exit(1);
}

const firstyear = siteData.firstyear;

const firstYearDir = path.join(__dirname, 'first-year');

const layoutTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{CYCLE_NAME}} | {{SCHEME_NAME}} | vtuwise</title>
    <link rel="stylesheet" href="../../../styles.css">
    <link rel="manifest" href="../../../manifest.json">
</head>
<body>
    <nav id="navbar"></nav>

    <main class="container" style="padding-top: 8rem;">
        <div class="breadcrumb">
            <a href="../../../index.html">🏠</a>
            <span class="breadcrumb-separator">/</span>
            <a href="../../index.html">First Year</a>
            <span class="breadcrumb-separator">/</span>
            <span>{{SCHEME_NAME}}</span>
            <span class="breadcrumb-separator">/</span>
            <span>{{CYCLE_NAME}}</span>
        </div>

        <header style="margin-bottom: 4rem;">
            <div class="badge" style="color: var(--primary); background: rgba(99, 102, 241, 0.1); width: fit-content; margin-bottom: 1rem;">{{SCHEME_NAME}}</div>
            <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem;">{{CYCLE_NAME}}</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px;">Access all notes and study materials for {{CYCLE_NAME}}.</p>
        </header>

        <div id="subjects-grid" class="subjects-grid"></div>
    </main>

    <script src="../../../data.js"></script>
    <script src="../../../auth.js"></script>
    <script src="../../../nav.js"></script>
    <script src="../../../search.js"></script>
    <script>
        const schemeSlug = "{{SCHEME_SLUG}}";
        const cycleSlug = "{{CYCLE_SLUG}}";
        const scheme = siteData.firstyear.schemes.find(s => s.slug === schemeSlug);
        const cycle = scheme.cycles.find(c => c.slug === cycleSlug);
        
        const grid = document.getElementById('subjects-grid');
        
        if (cycle && cycle.subjects && cycle.subjects.length > 0) {
            cycle.subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'subject-card glass';
                card.innerHTML = \`
                    <div class="subject-header">
                        <h3 class="subject-title">\${subject.name}</h3>
                        <span class="subject-code">\${subject.code}</span>
                    </div>
                    <div class="subject-meta">
                        <span>\${subject.credits}</span>
                        <span>\${subject.modules ? subject.modules.length : 0} Modules</span>
                    </div>
                    <a href="\${subject.slug}/" class="btn-primary" style="width: 100%; text-align: center; display: block;">View Modules</a>
                \`;
                grid.appendChild(card);
            });
        } else {
             grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Subjects are currently being added for this cycle. Check back soon!</p>';
        }
    </script>
</body>
</html>`;

const subjectTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SUBJECT_NAME}} | {{CYCLE_NAME}} | vtuwise</title>
    <link rel="stylesheet" href="../../../../styles.css">
    <link rel="manifest" href="../../../../manifest.json">
</head>
<body>
    <nav id="navbar"></nav>

    <main class="container" style="padding-top: 8rem;">
        <div class="breadcrumb">
            <a href="../../../../index.html">🏠</a>
            <span class="breadcrumb-separator">/</span>
            <a href="../../../index.html">First Year</a>
            <span class="breadcrumb-separator">/</span>
            <a href="../index.html">{{CYCLE_NAME}}</a>
            <span class="breadcrumb-separator">/</span>
            <span>{{SUBJECT_NAME}}</span>
        </div>

        <header style="margin-bottom: 4rem;">
            <div class="badge" style="color: var(--primary); background: rgba(99, 102, 241, 0.1); width: fit-content; margin-bottom: 1rem;">{{SUBJECT_CODE}}</div>
            <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem;">{{SUBJECT_NAME}}</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px;">Complete notes and materials for {{SUBJECT_NAME}}.</p>
        </header>

        <section class="modules-section">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Study Materials</h2>
                    <p style="color: var(--text-muted);">Select a module to view or download</p>
                </div>
            </div>

            <div id="modules-grid" class="modules-grid"></div>
        </section>
    </main>

    <script src="../../../../data.js"></script>
    <script src="../../../../auth.js"></script>
    <script src="../../../../nav.js"></script>
    <script src="../../../../search.js"></script>
    <script>
        const schemeSlug = "{{SCHEME_SLUG}}";
        const cycleSlug = "{{CYCLE_SLUG}}";
        const subjectSlug = "{{SUBJECT_SLUG}}";
        
        const scheme = siteData.firstyear.schemes.find(s => s.slug === schemeSlug);
        const cycle = scheme.cycles.find(c => c.slug === cycleSlug);
        const subject = cycle.subjects.find(s => s.slug === subjectSlug);
        
        const grid = document.getElementById('modules-grid');
        
        if (subject && subject.modules && subject.modules.length > 0) {
            subject.modules.forEach(mod => {
                const card = document.createElement('div');
                card.className = 'module-card glass';
                
                let essentialBadge = mod.essential ? '<span class="essential-badge">Essential</span>' : '';
                
                card.innerHTML = \`
                    <div class="module-header">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <h3 style="font-size: 1.25rem;">\${mod.name}</h3>
                            \${essentialBadge}
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.5;">\${mod.desc}</p>
                    </div>
                    
                    <div class="module-meta" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
                        <span style="display: flex; align-items: center; gap: 0.25rem;">📄 \${mod.type}</span>
                        <span style="display: flex; align-items: center; gap: 0.25rem;">💾 \${mod.size}</span>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <a href="\${mod.link}" class="btn-primary btn-preview" style="flex: 1; text-align: center; text-decoration: none;">Preview</a>
                        <a href="\${mod.link}" target="_blank" class="btn-secondary" style="flex: 1; text-align: center; text-decoration: none;">Download</a>
                    </div>
                \`;
                grid.appendChild(card);
            });
        } else {
             grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Modules for this subject are currently being updated.</p>';
        }
    </script>
</body>
</html>`;

firstyear.schemes.forEach(scheme => {
    const schemeDir = path.join(firstYearDir, scheme.slug);
    if (!fs.existsSync(schemeDir)) {
        fs.mkdirSync(schemeDir, { recursive: true });
    }

    scheme.cycles.forEach(cycle => {
        const cycleDir = path.join(schemeDir, cycle.slug);
        if (!fs.existsSync(cycleDir)) {
            fs.mkdirSync(cycleDir, { recursive: true });
        }

        // Generate Cycle index.html
        let cycleHtml = layoutTemplate
            .replace(/{{SCHEME_NAME}}/g, scheme.name)
            .replace(/{{SCHEME_SLUG}}/g, scheme.slug)
            .replace(/{{CYCLE_NAME}}/g, cycle.name)
            .replace(/{{CYCLE_SLUG}}/g, cycle.slug);

        fs.writeFileSync(path.join(cycleDir, 'index.html'), cycleHtml);
        console.log(`Created layout for ${scheme.name} - ${cycle.name}`);

        // Create subject directories and their index.html
        cycle.subjects.forEach(subject => {
            const subjectDir = path.join(cycleDir, subject.slug);
            if (!fs.existsSync(subjectDir)) {
                fs.mkdirSync(subjectDir, { recursive: true });
            }

            let subHtml = subjectTemplate
                .replace(/{{SCHEME_NAME}}/g, scheme.name)
                .replace(/{{SCHEME_SLUG}}/g, scheme.slug)
                .replace(/{{CYCLE_NAME}}/g, cycle.name)
                .replace(/{{CYCLE_SLUG}}/g, cycle.slug)
                .replace(/{{SUBJECT_NAME}}/g, subject.name)
                .replace(/{{SUBJECT_CODE}}/g, subject.code)
                .replace(/{{SUBJECT_SLUG}}/g, subject.slug);

            fs.writeFileSync(path.join(subjectDir, 'index.html'), subHtml);
            console.log(`  Generated nested structure for ${subject.name}`);
        });
    });
});

console.log('✅ Generation complete.');
