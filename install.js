const axios = require('axios');
const fs = require('fs');
const mavenBaseURL = process.env.MAVEN_BASE_URL || 'https://repo1.maven.org/maven2';
const mavenPath = 'com/github/tomakehurst/wiremock-standalone';

function resolveWiremockVersion() {
  return axios.get(`${mavenBaseURL}/${mavenPath}/maven-metadata.xml`)
    .then(({ data: meta }) => {
      if (process.env.WIREMOCK_VERSION) {
        const check = new RegExp(`<version>${process.env.WIREMOCK_VERSION}<\/version>`);
        if (!check.test(meta)) {
          throw new Error(`Unknown WIREMOCK_VERSION value: ${process.env.WIREMOCK_VERSION}`);
        }

        return process.env.WIREMOCK_VERSION;
      }

      // latest
      return meta.match(/<release>([.\d]+)<\/release>/m)[1];
    });
}

function download(url, dest) {
  return axios.get(url, { responseType: 'stream' })
    .then(({ data }) => data.pipe(fs.createWriteStream(dest)));
}

resolveWiremockVersion()
  .then((version) => {
    const url = `${mavenBaseURL}/${mavenPath}/${version}/wiremock-standalone-${version}.jar`;

    console.log(`Downloading WireMock standalone from Maven Central...\n ${url}`);

    return download(url, './wiremock-standalone.jar')
      .then(() => console.log('Done.'));
  })
  .catch((e) => {
    console.error(`\x1b[31m Error: ${e.message}`);
    process.exit(1);
  });
