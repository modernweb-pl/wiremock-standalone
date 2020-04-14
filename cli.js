#!/usr/bin/env node
'use strict';

const spawnSync = require('child_process').spawnSync;

const jarPath = require.resolve('./wiremock-standalone.jar');
const argv = process.argv;
const wiremockArgs = [];
const javaArgs = [];

for (let i = 2; i < argv.length; i++) {
  if (argv[i] === '--java-arg') {
    javaArgs.push(argv[++i]);
  } else {
    wiremockArgs.push(argv[i]);
  }
}

const result = spawnSync(
  'java',
  javaArgs.concat('-jar', jarPath, ...wiremockArgs),
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
