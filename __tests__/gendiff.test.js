import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const normalizeEol = (value) => value.replace(/\r\n/g, '\n');

describe('genDiff', () => {
  test.each([
    ['json', 'nested1.json', 'nested2.json', 'stylish', 'expected-nested.txt'],
    ['yml/yaml', 'nested1.yml', 'nested2.yaml', 'stylish', 'expected-nested.txt'],
    ['json', 'nested1.json', 'nested2.json', 'plain', 'expected-plain.txt'],
    ['yml/yaml', 'nested1.yml', 'nested2.yaml', 'plain', 'expected-plain.txt'],
    ['json', 'nested1.json', 'nested2.json', 'json', 'expected-json.txt'],
    ['yml/yaml', 'nested1.yml', 'nested2.yaml', 'json', 'expected-json.txt'],
  ])('compares two nested %s files (%s)', (_fileFormat, file1Name, file2Name, outputFormat, expectedFixture) => {
    const file1Path = getFixturePath(file1Name);
    const file2Path = getFixturePath(file2Name);
    const expectedPath = getFixturePath(expectedFixture);
    const expected = normalizeEol(readFileSync(expectedPath, 'utf8')).trimEnd();
    const actual = normalizeEol(genDiff(file1Path, file2Path, outputFormat)).trimEnd();

    expect(actual).toBe(expected);
  });

  test('uses stylish by default', () => {
    const file1Path = getFixturePath('nested1.json');
    const file2Path = getFixturePath('nested2.json');
    const expectedPath = getFixturePath('expected-nested.txt');
    const expected = normalizeEol(readFileSync(expectedPath, 'utf8')).trimEnd();
    const actual = normalizeEol(genDiff(file1Path, file2Path)).trimEnd();

    expect(actual).toBe(expected);
  });
});
