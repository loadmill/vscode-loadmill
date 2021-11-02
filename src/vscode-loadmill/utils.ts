import { window, TextDocument } from 'vscode';
import { LOADMILL_SUITES_FOLDER_PATH } from './constants';

export function isEmptyYamlLoadmillSuiteFile(document: TextDocument): boolean {
  const isEmptyText = document.getText().trim() === '';
  return isYamlLoadmillSuiteFile(document) && isEmptyText;
}

export function isYamlLoadmillSuiteFile(document: TextDocument): boolean {
  const isYaml = document.languageId === 'yaml';
  const isLoadmillSuite = document.uri.path.includes(LOADMILL_SUITES_FOLDER_PATH);
  return isYaml && isLoadmillSuite;
}

export function notifyNoSelectedLoadmillSuiteFile(): void {
  window.showInformationMessage('No Loadmill suite yaml file was selected 🤷‍♀️');
}
