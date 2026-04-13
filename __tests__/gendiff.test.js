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
  test('compares two flat JSON files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const expectedPath = getFixturePath('expected-flat.txt');
    const expected = normalizeEol(readFileSync(expectedPath, 'utf8')).trimEnd();
    const actual = normalizeEol(genDiff(file1Path, file2Path)).trimEnd();

    expect(actual).toBe(expected);
  });
});
