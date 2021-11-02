import { ExtensionContext } from 'vscode';
import { SchemaExtensionAPI } from '../schema-extension-api';
import { addLoadmillSchema } from './add-loadmill-schema';
import { initStatusBarItem } from './init-status-bar-item';
import {
  registerLoadmillCompletionItemProvider,
  registerTriggerSuggestOnChangeToEmptyLoadmillSuite,
  registerTriggerSuggestOnOpenEmptyLoadmillSuite,
} from './loadmill-completion-item-provider';
import { registerOpenSuite } from './open-suite';

export const LoadmillExtension = {
  activate(context: ExtensionContext, schemaExtensionAPI: SchemaExtensionAPI): void {
    initStatusBarItem(context);
    addLoadmillSchema(schemaExtensionAPI);
    registerLoadmillCompletionItemProvider(context);
    registerTriggerSuggestOnChangeToEmptyLoadmillSuite();
    registerTriggerSuggestOnOpenEmptyLoadmillSuite();
    registerOpenSuite(context);
  },
};
