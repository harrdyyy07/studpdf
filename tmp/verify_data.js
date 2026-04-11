
const { siteData } = require('./web/src/data/notesData');
console.log('SiteData Keys:', Object.keys(siteData));
if (siteData['first-year']) {
    console.log('first-year branch found!');
    console.log('Title:', siteData['first-year'].title);
    console.log('Schemes:', siteData['first-year'].schemes.map(s => s.name));
    siteData['first-year'].schemes.forEach(s => {
        console.log(`Scheme: ${s.name}, Cycles:`, s.cycles.map(c => c.name));
    });
} else {
    console.error('first-year branch NOT found!');
}
