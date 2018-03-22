const spawn = require('child_process').spawnSync;

const version = require('./package.json').version;
const url = 'http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/'
  + `${version}/wiremock-standalone-${version}.jar`;

console.log('Downloading WireMock standalone from Maven Central...');

const wiremockBuild = spawn('curl', [ '-s', '-S', '-L', '-o', './wiremock-standalone.jar', url ], {
  stdio: 'inherit',
});

if (wiremockBuild.status !== 0) {
  throw new Error('Downloading WireMock jar from Maven Central failed');
}

console.log('Done.');
