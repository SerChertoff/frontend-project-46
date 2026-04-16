import isPlainObject from 'lodash/isPlainObject.js';

const toPlainValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
};

const formatNode = (node, parentPath) => {
  const propertyPath = [...parentPath, node.key].join('.');

  switch (node.type) {
    case 'nested':
      return node.children.flatMap((child) => formatNode(child, [...parentPath, node.key]));
    case 'added':
      return `Property '${propertyPath}' was added with value: ${toPlainValue(node.value)}`;
    case 'deleted':
      return `Property '${propertyPath}' was removed`;
    case 'updated':
      return `Property '${propertyPath}' was updated. From ${toPlainValue(node.oldValue)} to ${toPlainValue(node.newValue)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatPlain = (tree) => `${tree.flatMap((node) => formatNode(node, [])).join('\n')}\n`;

export default formatPlain;
