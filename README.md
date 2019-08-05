# WireMock Standalone for NPM

[![npm version](https://img.shields.io/npm/v/wiremock-standalone)](https://www.npmjs.com/package/wiremock-standalone)
![Maven Central](https://img.shields.io/maven-central/v/com.github.tomakehurst/wiremock-standalone?label=wiremock)
![npm](https://img.shields.io/npm/dw/wiremock-standalone)

This package downloads [WireMock standalone](http://wiremock.org/docs/running-standalone/) from Maven Central and provides simple CLI wrapper for NPM.

## How to use

```bash
npm i -D wiremock-standalone
# OR
yar add -D wiremock-standalone
```

Usage (as script in `package.json`):

```json
{
  "scripts": {
    "start:mock": "wiremock --root-dir ./mock"
  }
}
```

## Options

### Custom Maven repository URL

You can use the `MAVEN_BASE_URL` environment variable to override the public `https://repo1.maven.org/maven2` URL.

## Donation

If this project help you reduce time to develop, you can give me a cup of coffee :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg)](https://www.paypal.me/RafalGalka)
