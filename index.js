import parseFile from './src/parsers.js';

export default function genDiff(filepath1, filepath2) {
  parseFile(filepath1);
  parseFile(filepath2);
  return '';
}
