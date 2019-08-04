# WireMock Standalone for NPM

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

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/RafalGalka)
