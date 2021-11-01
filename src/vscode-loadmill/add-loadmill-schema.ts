import { window, commands } from 'vscode';
import { SchemaExtensionAPI } from '../schema-extension-api';
import { LOADMILL_SUITES_FOLDER_PATH, PROVIDER, REQUEST_SCHEMA_URI } from './constants';
import { LOADMILL_SUITE_SCHEMA } from './schema/loadmill-public-suite-schema';

export function addLoadmillSchema(schemaExtensionAPI: SchemaExtensionAPI): void {
  try {
    schemaExtensionAPI.registerContributor(PROVIDER, requestSchema, requestSchemaContent);
  } catch (e) {
    window
      .showErrorMessage('There was a problem loading the Loadmill schema. To fix this, please reload VSCode', 'reload', 'close')
      .then((selection) => {
        if (selection === 'reload') {
          commands.executeCommand('workbench.action.reloadWindow');
        }
      });
  }
}
function requestSchema(resource: string): string | undefined {
  if (resource.includes(LOADMILL_SUITES_FOLDER_PATH)) {
    return REQUEST_SCHEMA_URI;
  }
  return undefined;
}
function requestSchemaContent(): string {
  return JSON.stringify(LOADMILL_SUITE_SCHEMA);
}
