import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const formatOutput = (tree, formatName) => {
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return format(tree);
};

export default formatOutput;
