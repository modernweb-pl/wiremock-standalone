const request = require('request');
const fs = require('fs');
const version = require('./package.json').version;
const mavenBaseURL = process.env.MAVEN_BASE_URL || 'https://repo1.maven.org/maven2';

function download(url, dest, cb) {
  const errorHandler = (err) => {
    fs.unlink(dest, () => void 0);
    return cb(err);
  };

  const file = fs.createWriteStream(dest).on('error', errorHandler);
  request.get(url).on('error', errorHandler).pipe(file);
}

const wiremockVersion = version.split('-').shift();
const url = mavenBaseURL + '/com/github/tomakehurst/wiremock-standalone/'
  + `${wiremockVersion}/wiremock-standalone-${wiremockVersion}.jar`;

console.log(`Downloading WireMock standalone from Maven Central...\n  ${url}`);

download(url, './wiremock-standalone.jar', (error) => {
  if (error) {
    throw new Error(`Downloading WireMock jar from Maven Central failed: ${error.message}`);
  }

  console.log('Done.');
});
