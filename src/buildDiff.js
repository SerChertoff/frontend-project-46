import isPlainObject from 'lodash/isPlainObject.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';

const buildDiff = (data1, data2) => {
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const inFirst = Object.hasOwn(data1, key);
    const inSecond = Object.hasOwn(data2, key);

    if (!inSecond) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (!inFirst) {
      return { key, type: 'added', value: data2[key] };
    }

    const val1 = data1[key];
    const val2 = data2[key];

    if (isPlainObject(val1) && isPlainObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }
    if (val1 === val2) {
      return { key, type: 'unchanged', value: val1 };
    }
    return {
      key,
      type: 'updated',
      oldValue: val1,
      newValue: val2,
    };
  });
};

export default buildDiff;
