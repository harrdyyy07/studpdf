
const { siteData } = require('./web/src/data/notesData');

console.log('Branches in siteData:', Object.keys(siteData));
Object.keys(siteData).forEach(branch => {
  const sems = siteData[branch].semesters?.map(s => s.sem) || [];
  console.log(`Branch: ${branch}, Semesters: ${sems.join(', ')}`);
});
