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
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove defer from data.js paths
    const regex = /<script\s+defer\s+src="([^"]*data\.js)"><\/script>/g;
    if (regex.test(content)) {
        content = content.replace(regex, '<script src="$1"></script>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        count++;
    }
});

console.log(`Reverted data.js defer on ${count} HTML files.`);
