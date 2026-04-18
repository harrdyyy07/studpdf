
const fs = require('fs');
const content = fs.readFileSync('web/src/data/notesData.ts', 'utf8');

// Find siteData definition
const startMatch = content.match(/export const siteData: SiteData = \{/);
if (!startMatch) {
  console.log('Could not find siteData definition');
  process.exit(1);
}

const startIdx = startMatch.index + startMatch[0].length - 1;
let depth = 0;
let results = [];
let currentKey = '';
let lastCommaIdx = startIdx;

for (let i = startIdx; i < content.length; i++) {
  const char = content[i];
  if (char === '{') {
    if (depth === 1) {
       // Find the key before this brace
       const before = content.substring(lastCommaIdx + 1, i);
       const keyMatch = before.match(/(\w+):\s*$/);
       if (keyMatch) currentKey = keyMatch[1];
    }
    depth++;
  } else if (char === '}') {
    depth--;
    if (depth === 1) {
      results.push(currentKey);
      lastCommaIdx = i;
    }
    if (depth === 0) break;
  }
}

console.log('Top level keys in siteData:', results);
