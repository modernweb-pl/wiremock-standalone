#!/usr/bin/env node
'use strict';

const spawnSync = require('child_process').spawnSync;

const jarPath = require.resolve('./wiremock-standalone.jar');
const argv = process.argv;
const wiremockArgs = [];
const javaArgs = [];
const permittedSystemKeys = [];

for (let i = 2; i < argv.length; i++) {
  if (argv[i] === '--permitted-system-keys') {
    permittedSystemKeys.push(argv[++i]);
    continue;
  }

  if (argv[i] === '--java-arg') {
    const javaArg = argv[++i].trim();

    // collect system properties and append to `--permitted-system-keys`
    if (javaArg.startsWith('-D')) {
      permittedSystemKeys.push(javaArg.substr(2).split('=')[0]);
    }

    javaArgs.push(javaArg);
    continue;
  }

  wiremockArgs.push(argv[i]);
}

if (permittedSystemKeys.length) {
  wiremockArgs.push('--permitted-system-keys', permittedSystemKeys.join(','));
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
