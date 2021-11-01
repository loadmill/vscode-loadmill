import { ExtensionContext, window, commands, StatusBarAlignment } from 'vscode';
import { EXTENSION_NAME } from './constants';

export function initStatusBarItem(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand(`${EXTENSION_NAME}.onStatusBarItemClick`, () => {
      window.showWarningMessage('We still need to implement this 🤷‍♀️', 'implement', 'rest').then((selection) => {
        if (selection === 'implement') {
          window.showInformationMessage(
            'Hehe... You thought you can just click on this and everything will magically happen? Go on, code it!'
          );
        } else if (selection === 'rest') {
          window.showInformationMessage('Why you lousy bum! Get to work!');
        } else {
          window.showInformationMessage("Don't forget about me!");
        }
      });
    })
  );
  const item = window.createStatusBarItem(StatusBarAlignment.Right);
  item.tooltip = '';
  item.text = '$(squirrel) Loadmill';
  item.command = `${EXTENSION_NAME}.onStatusBarItemClick`;
  item.show();
}
