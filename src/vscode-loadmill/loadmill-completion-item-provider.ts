import {
  CancellationToken,
  commands,
  CompletionContext,
  CompletionItem,
  CompletionItemProvider,
  CompletionList,
  ExtensionContext,
  languages,
  MarkdownString,
  Position,
  ProviderResult,
  SnippetString,
  TextDocument,
  TextDocumentChangeEvent,
  workspace,
} from 'vscode';
import { BOILERPLATE_LOADMILL_SUITE_TEXT } from './constants';

export const loadmillCompletionItemProvider = {
  provideCompletionItems(
    document: TextDocument,
    _position: Position,
    _token: CancellationToken,
    _context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const completions: CompletionItem[] = [];
    if (isEmptyYamlLoadmillSuiteFile(document)) {
      const loadmillBoilerplateCompletion = new CompletionItem('New Loadmill suite');
      loadmillBoilerplateCompletion.detail = 'An example of a Loadmill suite';
      loadmillBoilerplateCompletion.commitCharacters = ['\t', '\n', ' '];
      loadmillBoilerplateCompletion.documentation = new MarkdownString('Boilerplate code for editing a Loadmill suite');
      loadmillBoilerplateCompletion.keepWhitespace = true;
      loadmillBoilerplateCompletion.insertText = new SnippetString(BOILERPLATE_LOADMILL_SUITE_TEXT);
      completions.push(loadmillBoilerplateCompletion);
    }
    return completions;
  },
};

export function registerLoadmillCompletionItemProvider(context: ExtensionContext): void {
  context.subscriptions.push(languages.registerCompletionItemProvider('yaml', loadmillCompletionItemProvider));
}

export function registerTriggerSuggestOnChangeToEmptyLoadmillSuite(): void {
  workspace.onDidChangeTextDocument(triggerSuggestOnChangeToEmptyLoadmillSuite());
}
export function registerTriggerSuggestOnOpenEmptyLoadmillSuite(): void {
  workspace.onDidOpenTextDocument(triggerSuggestOnOpenEmptyLoadmillSuite());
}

export function triggerSuggestOnChangeToEmptyLoadmillSuite(): (e: TextDocumentChangeEvent) => void {
  return (e?: TextDocumentChangeEvent) => {
    if (e && e.document) {
      const { document } = e;
      if (isEmptyYamlLoadmillSuiteFile(document)) {
        commands.executeCommand('editor.action.triggerSuggest');
      }
    }
  };
}

export function triggerSuggestOnOpenEmptyLoadmillSuite(): (e: TextDocument) => void {
  return (document: TextDocument) => {
    if (isEmptyYamlLoadmillSuiteFile(document)) {
      commands.executeCommand('editor.action.triggerSuggest');
    }
  };
}

function isEmptyYamlLoadmillSuiteFile(document: TextDocument): boolean {
  const isYaml = document.languageId === 'yaml';
  const isEmptyText = document.getText().trim() === '';
  const isLoadmillSuite = document.uri.path.includes('loadmill');
  return isYaml && isEmptyText && isLoadmillSuite;
}
