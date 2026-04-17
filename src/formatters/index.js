import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatOutput = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return formatJson(tree);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default formatOutput;
