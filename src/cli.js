import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import genDiff from '../index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');
const { version } = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();
