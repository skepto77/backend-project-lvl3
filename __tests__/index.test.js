import {
  describe,
  test,
  beforeEach,
  expect,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@jest/globals';

import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import nock from 'nock';
import pageLoader from '../src';

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
    nock('https://ru.hexlet.io')
      .get('/courses')
      .reply(200, data);

    await pageLoader(url, tmpDir);
    const result = await fs.readFile(path.join(tmpDir, filename), 'utf8');
    expect(data).toBe(result);
  });
});
