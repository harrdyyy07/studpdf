const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDirs = ['cse', 'ece', 'eee', 'civil'];
let filesChanged = 0;

targetDirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) return;

    walkDir(fullPath, function (filePath) {
        if (!filePath.endsWith('index.html') && !filePath.endsWith('template.html')) return;

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Pattern 1: Missing mod.type completely (like ECE)
        const oldPattern1 = /<div class="module-icon-box">📖<\/div>\s*\$\{mod\.essential \? '<div class="badge badge-essential">ESSENTIAL<\/div>' : ''\}\s*<\/div>/;

        if (oldPattern1.test(content)) {
            content = content.replace(oldPattern1, `<div class="module-icon-box">📄</div>\n                            <div class="badge">\${mod.type || 'Notes'}</div>\n                            \${mod.essential ? '<div class="badge badge-essential">ESSENTIAL</div>' : ''}\n                        </div>`);
            modified = true;
        }

        // Pattern 2: Template that just has mod.type but missing essential? Maybe we just want to ensure mod.type exists.
        // If it already has mod.type, we are good. Let's see if there are other variations.

        if (modified) {
            fs.writeFileSync(filePath, content);
            filesChanged++;
            console.log("Patched: " + filePath);
        }
    });
});

console.log("Total files patched:", filesChanged);
