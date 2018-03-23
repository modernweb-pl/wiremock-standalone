const spawn = require('child_process').spawnSync;
const version = require('./package.json').version;

const wiremockVersion = version.split('-')[0];
const url = 'http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/'
  + `${wiremockVersion}/wiremock-standalone-${wiremockVersion}.jar`;

console.log(`Downloading WireMock standalone from Maven Central...\n  ${url}`);

const wiremockBuild = spawn('curl', [ '-s', '-S', '-L', '-o', './wiremock-standalone.jar', url ], {
  stdio: 'inherit',
});

if (wiremockBuild.status !== 0) {
  throw new Error('Downloading WireMock jar from Maven Central failed');
}

console.log('Done.');
