const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (f === 'node_modules' || f === '.git' || f === 'calculators' ) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = __dirname;
let count = 0;

walkDir(targetDir, function (filePath) {
    if (!filePath.endsWith('.html')) return;
    
    // Skip the root index.html as we already fixed it
    if (filePath === path.join(__dirname, 'index.html')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add Google Fonts before stylesheet
    if (!content.includes('fonts.googleapis.com/css2') && content.includes('<link rel="stylesheet"')) {
        content = content.replace(
            /<link\s+rel="stylesheet"/,
            `<!-- Preconnect for Google Fonts -->\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet"`
        );
        modified = true;
    }

    // 2. Add defer to data.js, auth.js, etc.
    const scriptsToDefer = ['data.js', 'auth.js', 'slider.js', 'nav.js', 'search.js', 'ads.js'];
    scriptsToDefer.forEach(script => {
        // match non-deferred scripts
        const regex = new RegExp(`<script\\s+src="([^"]*${script})"><\\/script>`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `<script defer src="$1"></script>`);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content);
        count++;
    }
});

console.log(`Patched ${count} HTML files.`);
