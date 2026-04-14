import buildDiff from './src/buildDiff.js';
import formatStylish from './src/formatters/stylish.js';
import parseFile from './src/parsers.js';

const formatters = {
  stylish: formatStylish,
};

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const tree = buildDiff(data1, data2);
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return format(tree);
}
