const http = require('https');
const fs = require('fs');
const version = require('./package.json').version;
const mavenBaseURL = process.env.MAVEN_BASE_URL || 'https://repo1.maven.org/maven2';

function download(url, dest, cb) {
  const errorHandler = (message) => {
    fs.unlink(dest, () => {});
    return cb(message);
  };

  const file = fs.createWriteStream(dest);
  const request = http.get(url, (response) => {
    if (response.statusCode !== 200) {
      return errorHandler('Response status was ' + response.statusCode);
    }

    response.pipe(file);

    file.on('finish', () => {
      file.close(cb);
    });
  });

  request.on('error', (err) => errorHandler(err.message));
  file.on('error', (err) => errorHandler(err.message));
}

const wiremockVersion = version.split('-').shift();
const url = mavenBaseURL + '/com/github/tomakehurst/wiremock-standalone/'
  + `${wiremockVersion}/wiremock-standalone-${wiremockVersion}.jar`;

console.log(`Downloading WireMock standalone from Maven Central...\n  ${url}`);

download(url, './wiremock-standalone.jar', (error) => {
  if (error) {
    throw new Error(`Downloading WireMock jar from Maven Central failed: ${error}`);
  }

  console.log('Done.');
});
