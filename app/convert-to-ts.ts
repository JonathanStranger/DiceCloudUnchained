// convert-to-ts.ts
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';

// Prioritize these directories first
const priorityDirs = [
  'imports/constants',
  'imports/api/utility',
  'imports/parser',
  'imports/api/engine'
];

function convertFile(jsFilePath: string): void {
  const tsFilePath = jsFilePath.replace('.js', '.ts');
  
  // Skip files that are already TS
  if (fs.existsSync(tsFilePath)) {
    console.log(`Skipping ${jsFilePath} - TS file already exists`);
    return;
  }
  
  // Copy JS content to TS file
  fs.copyFileSync(jsFilePath, tsFilePath);
  console.log(`Converted: ${jsFilePath} → ${tsFilePath}`);
  
  // Optionally run TS lint to see errors
  try {
    child_process.execSync(`npx eslint --fix ${tsFilePath}`, { stdio: 'ignore' });
  } catch (e) {
    // Errors expected during initial conversion
  }
}

function processDirectory(dir: string): void {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (
      filePath.endsWith('.js') && 
      !filePath.endsWith('.test.js') &&
      !filePath.endsWith('.d.ts')
    ) {
      convertFile(filePath);
    }
  });
}

// Process priority directories first
priorityDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Processing priority directory: ${dir}`);
    processDirectory(dir);
  }
});