"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/find-requires.ts
var fs = require("fs");
var path = require("path");
var requireRegex = /(?:const|let|var)\s+(\w+|\{\s*[^}]+\})\s*=\s*require\(['"](.*)['"]\)/g;
function scanFileForRequires(filePath) {
    var content = fs.readFileSync(filePath, 'utf-8');
    var match;
    var found = false;
    while ((match = requireRegex.exec(content)) !== null) {
        if (!found) {
            console.log("\nFile: ".concat(filePath));
            found = true;
        }
        console.log("  Found require: ".concat(match[0]));
    }
}
function walkDir(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkDir(filePath);
        }
        else if (filePath.endsWith('.js')) {
            scanFileForRequires(filePath);
        }
    });
}
// Start scanning from imports directory
walkDir('./imports');
