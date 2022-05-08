import fs from 'fs';
import path from 'path';

function main() {
  const source = fs
    .readFileSync(path.resolve(`${path.dirname('')}/package.json`))
    .toString('utf-8');
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  sourceObj.main = 'index.js';
  sourceObj.types = 'all.d.ts';
  fs.writeFileSync(
    `./dist/package.json`,
    Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8')
  );
}

main();
