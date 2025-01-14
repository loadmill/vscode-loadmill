const protocol = process.env.PROTOCOL || 'https';
const domain = process.env.DOMAIN || 'app.loadmill.com';
const port = process.env.PORT;
const apiBaseUrl = `${protocol}://${domain}` + (port ? `:${port}` : '');

const suitePath = 'app/api-tests/test-suites';

export const LOADMILL_SUITE_URL = `${apiBaseUrl}/${suitePath}`;
export const LOADMILL_SUITES_FOLDER_PATH = 'loadmill-suites/';
export const EXTENSION_NAME = 'vscode-loadmill';
export const PROVIDER = 'loadmill';
export const REQUEST_SCHEMA_URI = `${PROVIDER}://schema/loadmill-suite-schema`;

export const BOILERPLATE_LOADMILL_SUITE_TEXT = `conf:
  meta:
    description: That's so Suite
flows:
  - conf:
      meta:
        description: Let it blossom, let it flow
      requests:

        - method: GET
          url: example.com`;
