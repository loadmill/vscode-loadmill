/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ExtensionContext } from 'vscode';
import { startClient, LanguageClientConstructor, RuntimeEnvironment } from '../extension';
import { ServerOptions, TransportKind, LanguageClientOptions, LanguageClient } from 'vscode-languageclient/node';

import { SchemaExtensionAPI } from '../schema-extension-api';

import { JSONSchemaCache } from '../json-schema-cache';

// this method is called when vs code is activated
export async function activate(context: ExtensionContext): Promise<SchemaExtensionAPI> {
  // The YAML language server is implemented in node
  const serverModule = context.asAbsolutePath('./dist/languageserver.js');

  // The debug options for the server
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions },
  };

  const newLanguageClient: LanguageClientConstructor = (id: string, name: string, clientOptions: LanguageClientOptions) => {
    return new LanguageClient(id, name, serverOptions, clientOptions);
  };

  const runtime: RuntimeEnvironment = {
    schemaCache: new JSONSchemaCache(context.globalStorageUri.fsPath, context.globalState),
  };

  return startClient(context, newLanguageClient, runtime);
}
