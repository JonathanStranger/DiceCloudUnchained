// convert-test-files.ts
import * as fs from 'fs';
import * as path from 'path';

function updateTestImports(content: string): string {
  // Update chai imports
  content = content.replace(
    'import { assert } from \'chai\';',
    'import { assert } from \'chai\';'
  );
  
  // Update meteor test imports
  content = content.replace(
    /import ['"]meteor\/meteortesting:mocha['"]/g,
    'import { describe, it, before, beforeEach, after, afterEach } from \'meteor/meteortesting:mocha\''
  );
  
  return content;
}

function convertTestFile(jsFilePath: string): void {
  const tsFilePath = jsFilePath.replace('.js', '.ts');
  
  if (fs.existsSync(tsFilePath)) {
    console.log(`Skipping ${jsFilePath} - TS file already exists`);
    return;
  }
  
  let content = fs.readFileSync(jsFilePath, 'utf-8');
  content = updateTestImports(content);
  
  fs.writeFileSync(tsFilePath, content);
  console.log(`Converted test: ${jsFilePath} → ${tsFilePath}`);
}

function findTestFiles(dir: string): void {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTestFiles(filePath);
    } else if (filePath.endsWith('.test.js')) {
      convertTestFile(filePath);
    }
  });
}

// Process imports directory
findTestFiles('./imports');