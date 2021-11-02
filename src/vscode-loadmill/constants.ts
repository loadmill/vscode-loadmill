const port = '8090';
const protocol = 'http';
const domain = 'localhost';
const apiBaseUrl = `${protocol}://${domain}:${port}`;

const schemaPath = 'open-api/schema';

export const LOADMILL_SCHEMA_URL = `${apiBaseUrl}/${schemaPath}` || 'https://app.loadmill.com/open-api/schema';
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
