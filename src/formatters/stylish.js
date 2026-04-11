import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';

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

const formatFlatDiff = (data1, data2) => {
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));
  const lines = ['{'];

  for (const key of keys) {
    const inFirst = Object.hasOwn(data1, key);
    const inSecond = Object.hasOwn(data2, key);
    const val1 = data1[key];
    const val2 = data2[key];

    if (inFirst && inSecond) {
      if (val1 === val2) {
        lines.push(`    ${key}: ${valueToString(val1)}`);
      } else {
        lines.push(`  - ${key}: ${valueToString(val1)}`);
        lines.push(`  + ${key}: ${valueToString(val2)}`);
      }
    } else if (inFirst) {
      lines.push(`  - ${key}: ${valueToString(val1)}`);
    } else {
      lines.push(`  + ${key}: ${valueToString(val2)}`);
    }
  }

  lines.push('}');
  return `${lines.join('\n')}\n`;
};

export default formatFlatDiff;
