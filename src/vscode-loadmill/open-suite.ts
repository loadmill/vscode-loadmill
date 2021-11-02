import { commands, ExtensionContext, Uri, window } from 'vscode';
import { EXTENSION_NAME, LOADMILL_SUITE_URL } from './constants';
import { isYamlLoadmillSuiteFile, notifyNoSelectedLoadmillSuiteFile } from './utils';

export function registerOpenSuite(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(`${EXTENSION_NAME}.openSuite`, openSuite));
}

function openSuite(): void {
  if (window.activeTextEditor) {
    const {
      activeTextEditor: { document },
    } = window;

    if (isYamlLoadmillSuiteFile(document)) {
      commands.executeCommand('vscode.open', Uri.parse(`${LOADMILL_SUITE_URL}/${getSuiteId(document.fileName)}`));
    } else {
      notifyNoSelectedLoadmillSuiteFile();
    }
  } else {
    notifyNoSelectedLoadmillSuiteFile();
  }
}

/**
 * Extracts the suiteId from fileName and returns it.
 *
 * If for some reason can't find it, returns an empty string.
 * @param fileName in format /Users/myname/myrepo/loadmill-suites/[suite_name].[suite_id].yaml
 * @returns suiteId or empty string
 */
function getSuiteId(fileName: string): string {
  return fileName.split('.')[1] || '';
}
