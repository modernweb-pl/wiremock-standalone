const axios = require('axios');
const fs = require('fs');
const { lilconfigSync } = require('lilconfig');

const explorer = lilconfigSync('wiremock', { searchPlaces: ['.wiremock', 'package.json'] });
const config = (explorer.search() || { config: {} }).config;
const options = {
  version: process.env.WIREMOCK_VERSION || config.version,
  mavenRepoURL: process.env.MAVEN_BASE_URL || process.env.MAVEN_REPO_URL || config.mavenRepoURL || 'https://repo1.maven.org/maven2',
  jreVersion: process.env.JRE_VERSION || process.env.JRE_VERSION || config.jreVersion || 'jre8',
};
const mavenPath = 'com/github/tomakehurst';
const name = options.jreVersion === 'jre8' ? 'wiremock-jre8-standalone' : 'wiremock-standalone';

function resolveVersion() {
  const metadataUrl = `${options.mavenRepoURL}/${mavenPath}/${name}/maven-metadata.xml`;
  console.log(`Resolving WireMock version from Maven metadata...\n ${metadataUrl}`);
  return axios.get(metadataUrl)
    .then(({ data: meta }) => {
      if (options.version) {
        const regexp = new RegExp(`<version>${options.version}<\/version>`);
        if (!regexp.test(meta)) {
          throw new Error(`Unknown WireMock version: ${options.version}`);
        }

        return options.version;
      }

      // latest stable
      return meta.match(/(?<=<version>)[.\d]+(?=<\/version>)/g).pop();
    });
}

function download(url, dest) {
  return axios.get(url, { responseType: 'stream' })
    .then(({ data }) => data.pipe(fs.createWriteStream(dest)));
}

resolveVersion()
  .then((version) => {
    const url = `${options.mavenRepoURL}/${mavenPath}/${name}/${version}/${name}-${version}.jar`;

    console.log(`Downloading WireMock standalone from Maven Central...\n ${url}`);

    return download(url, './wiremock-standalone.jar')
      .then(() => console.log('Done.'));
  })
  .catch((e) => {
    console.error(`\x1b[31m Error: ${e.message}`);
    process.exit(1);
  });
