const fs = require('fs');
const path = require('path');

const dataJsPath = path.resolve(__dirname, 'data.js');
const tsPath = path.resolve(__dirname, 'web/src/data/notesData.ts');

const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// The data.js is a simple JS object assignment: const siteData = { ... };
// We want to export it and add types.

const tsHeader = `export interface Module {
  id: number;
  name: string;
  desc: string;
  link: string;
  type: string;
}

export interface Subject {
  name: string;
  code: string;
  credits: string;
  slug: string;
  modules: Module[];
}

export interface Semester {
  sem: number;
  subjects: Subject[];
}

export interface Cycle {
  name: string;
  slug: string;
  subjects: Subject[];
}

export interface Scheme {
  name: string;
  slug: string;
  cycles: Cycle[];
}

export interface BranchData {
  title: string;
  semesters?: Semester[];
  schemes?: Scheme[];
}

export interface SiteData {
  [key: string]: BranchData;
}

`;

let content = dataJsContent.replace('const siteData =', 'export const siteData: SiteData =');

// Fix any potential formatting issues or trailing semicolons
if (content.endsWith(';')) {
    // Already good
} else {
    content += ';';
}

fs.writeFileSync(tsPath, tsHeader + content);
console.log('Successfully migrated data.js to notesData.ts');
