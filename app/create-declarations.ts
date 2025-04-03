    // create-declarations.ts
import * as fs from 'fs';
import * as path from 'path';

function createDeclaration(jsFilePath: string): void {
  const dirName = path.dirname(jsFilePath);
  const baseName = path.basename(jsFilePath, '.js');
  const dtsPath = path.join(dirName, `${baseName}.d.ts`);
  
  // Skip if declaration file already exists
  if (fs.existsSync(dtsPath)) {
    return;
  }
  
  const moduleName = path.relative('./imports', jsFilePath)
    .replace('.js', '')
    .replace(/\\/g, '/');
  
  const content = `// Auto-generated TypeScript declaration file
declare module '/${moduleName}' {
  const _default: any;
  export default _default;
  
  // Add known exports here manually
}
`;

  fs.writeFileSync(dtsPath, content);
  console.log(`Created declaration file for: ${jsFilePath}`);
}

function walkDirForJS(dir: string): void {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDirForJS(filePath);
    } else if (filePath.endsWith('.js') && !filePath.endsWith('.d.ts')) {
      createDeclaration(filePath);
    }
  });
}

// Start from imports directory
walkDirForJS('./imports');