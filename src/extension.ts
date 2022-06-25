// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "builder-snippets.helloWorld",
    async () => {
      const editor = vscode.window.activeTextEditor as vscode.TextEditor;
      const selectedTexts = getSelectedTexts(editor);
      await vscode.commands.executeCommand("editor.action.jumpToBracket");

      editor?.edit(textEditorEdit => {
        const position = editor.selection.active;
        textEditorEdit.insert(position, createCodeSnippets(selectedTexts));
      });
    }
  );

  context.subscriptions.push(disposable);
}

function getSelectedTexts(editor: vscode.TextEditor): string[] {
  const selectedTexts: string[] = [];

  editor.selections.forEach(selection => {
    const text = editor.document.getText(selection);
    selectedTexts.push(text);
  });

  return selectedTexts;
}

function createCodeSnippets(selectedTexts: string[]): string {
  const codeSnippets = selectedTexts.map(text => {
    return `public with${capitalizeFirstLetter(text)}(${text}) {
	this.${text} = ${text};
	return this;
}`;
  });
  return codeSnippets.join("\n\n") + "\n";
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function deactivate() {}
