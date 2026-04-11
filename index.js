import formatFlatDiff from './src/formatters/stylish.js';
import parseFile from './src/parsers.js';

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  return formatFlatDiff(data1, data2);
}
