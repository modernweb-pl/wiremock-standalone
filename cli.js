#!/usr/bin/env node
'use strict';

const spawnSync = require('child_process').spawnSync;

const compilerPath = require.resolve('./wiremock-standalone.jar');
const result = spawnSync(
  'java',
  [ '-jar', compilerPath ].concat(process.argv.slice(2)),
  { stdio: 'inherit' },
);

if (result.error) {
  if (result.error.code === 'ENOENT') {
    console.error('Could not find "java" in your PATH.');
  } else {
    console.error(result.error.message);
  }
  process.exit(1);
} else {
  process.exit(result.status);
}
