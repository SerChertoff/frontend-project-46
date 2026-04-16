import isPlainObject from 'lodash/isPlainObject.js';
import sortBy from 'lodash/sortBy.js';

const valueToString = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }
  return JSON.stringify(value);
};

const stringify = (data, depth) => {
  if (!isPlainObject(data)) {
    return valueToString(data);
  }
  const keys = sortBy(Object.keys(data));
  const lines = keys.map((key) => {
    const val = data[key];
    const indent = ' '.repeat((depth + 1) * 4);
    if (isPlainObject(val)) {
      const nested = stringify(val, depth + 1);
      return `${indent}${key}: {\n${nested}\n${indent}}`;
    }
    return `${indent}${key}: ${valueToString(val)}`;
  });
  return lines.join('\n');
};

const lineForKey = (depth, sign, key) => {
  if (sign === ' ') {
    return `${' '.repeat(depth * 4)}${key}`;
  }
  const indent = ' '.repeat(depth * 4 - 2);
  return `${indent}${sign} ${key}`;
};

const formatLeaf = (depth, sign, key, value) => {
  if (isPlainObject(value)) {
    const open = `${lineForKey(depth, sign, key)}: {`;
    const body = stringify(value, depth);
    const close = `${' '.repeat(depth * 4)}}`;
    return [open, body, close].join('\n');
  }
  return `${lineForKey(depth, sign, key)}: ${valueToString(value)}`;
};

const iter = (nodes, depth) => {
  const lines = [];

  for (const node of nodes) {
    const { key } = node;

    switch (node.type) {
      case 'nested': {
        lines.push(`${lineForKey(depth, ' ', key)}: {`);
        lines.push(...iter(node.children, depth + 1));
        lines.push(`${' '.repeat(depth * 4)}}`);
        break;
      }
      case 'unchanged': {
        lines.push(formatLeaf(depth, ' ', key, node.value));
        break;
      }
      case 'added': {
        lines.push(formatLeaf(depth, '+', key, node.value));
        break;
      }
      case 'deleted': {
        lines.push(formatLeaf(depth, '-', key, node.value));
        break;
      }
      case 'updated': {
        lines.push(formatLeaf(depth, '-', key, node.oldValue));
        lines.push(formatLeaf(depth, '+', key, node.newValue));
        break;
      }
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  return lines;
};

const formatStylish = (tree) => {
  const lines = ['{', ...iter(tree, 1), '}'];
  return `${lines.join('\n')}\n`;
};

export default formatStylish;
