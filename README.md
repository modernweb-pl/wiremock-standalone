# WireMock Standalone for NPM

Simple wrapper for [WireMock standalone](http://wiremock.org/docs/running-standalone/).

Install:

```bash
npm i -D wiremock-standalone
```

Usage (as script in `package.json`):

```json
{
  "scripts": {
    "start:mock": "wiremock --root-dir ./mock"
  }
}
```

Maven Override:

You can use the `MAVEN_BASE_URL` environment variable to override the public `https://repo1.maven.org/maven2` URL.
