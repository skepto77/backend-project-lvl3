/* eslint-disable object-curly-newline */
import path from 'path';
import os from 'os';
import fs from 'fs/promises';
import { test, expect, describe, beforeEach } from '@jest/globals';
import nock from 'nock';
import pageLoader from '../src/index.js';

nock.disableNetConnect();

const url = 'https://ru.hexlet.io/courses';
const data = '<!DOCTYPE html><html><head></head><body></body></html>';
const filename = 'ru-hexlet-io-courses.html';
let tmpDir;

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

describe('pageLoader', () => {
  test('Saving to file with URL', async () => {
    nock('https://ru.hexlet.io').get('/courses').reply(200, data);

    await pageLoader(url, tmpDir);
    const result = await fs.readFile(path.join(tmpDir, filename), 'utf8');
    expect(data).toBe(result);
  });
});
