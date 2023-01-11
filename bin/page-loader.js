#!/usr/bin/env node

import { program } from 'commander';
import pageLoader from '../src/index.js';

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .description('Page loader')
  .arguments('<url>')
  .option('-o, --output [pathToFolder]', 'path to output folder', process.cwd())
  .action((url, option) => {
    pageLoader(url, option.output)
      .then(() =>
        console.log(`${url} has been saved to folder ${option.output}`)
      )
      .catch((e) => {
        console.error(e.message);
        process.exit(1);
      });
  })
  .parse(process.argv);
