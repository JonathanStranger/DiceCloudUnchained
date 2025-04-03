// scripts/find-requires.ts
import * as fs from 'fs';
import * as path from 'path';

const requireRegex = /(?:const|let|var)\s+(\w+|\{\s*[^}]+\})\s*=\s*require\(['"](.*)['"]\)/g;

function scanFileForRequires(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  let match;
  let found = false;
  
  while ((match = requireRegex.exec(content)) !== null) {
    if (!found) {
      console.log(`\nFile: ${filePath}`);
      found = true;
    }
    console.log(`  Found require: ${match[0]}`);
  }
}

function walkDir(dir: string): void {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.js')) {
      scanFileForRequires(filePath);
    }
  });
}

// Start scanning from imports directory
walkDir('./imports');