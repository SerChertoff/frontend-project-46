import buildDiff from './src/buildDiff.js';
import formatOutput from './src/formatters/index.js';
import parseFile from './src/parsers.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const tree = buildDiff(data1, data2);
  return formatOutput(tree, formatName);
}
