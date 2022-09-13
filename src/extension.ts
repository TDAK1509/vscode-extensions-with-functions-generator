// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "with-functions-generator.generateWithFunctions",
    async () => {
      const editor = vscode.window.activeTextEditor as vscode.TextEditor;
      const selectedTexts = getSelectedTexts(editor);
      await vscode.commands.executeCommand("editor.action.jumpToBracket");

      editor?.edit(textEditorEdit => {
        const position = editor.selection.active;
        textEditorEdit.insert(position, "\n");
        textEditorEdit.insert(position, createCodeSnippets(selectedTexts));
      });
    }
  );

  const disposable2 = vscode.commands.registerCommand(
    "with-functions-generator.generateWithFunctionsWithType",
    async () => {
      const editor = vscode.window.activeTextEditor as vscode.TextEditor;
      const selectedTexts = getSelectedTexts(editor);
      await vscode.commands.executeCommand("editor.action.jumpToBracket");

      editor?.edit(textEditorEdit => {
        const position = editor.selection.active;
        textEditorEdit.insert(position, "\n");
        textEditorEdit.insert(
          position,
          createCodeSnippetsWithType(selectedTexts)
        );
      });
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
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
    return `	public with${capitalizeFirstLetter(text)}(${text}) {
		this.${text} = ${text};
		return this;
	}`;
  });
  return codeSnippets.join("\n\n") + "\n";
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCodeSnippetsWithType(selectedTexts: string[]): string {
  const codeSnippets = selectedTexts.map(text => {
    return `	public with${capitalizeFirstLetter(
      text
    )}(${text}: PleaseRenameThisType['${text}']) {
		this.${text} = ${text};
		return this;
	}`;
  });
  return codeSnippets.join("\n\n") + "\n";
}

export function deactivate() {}
