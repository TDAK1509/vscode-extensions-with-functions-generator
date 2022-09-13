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
  let selectedTexts: string[] = [];

  editor.selections.forEach(selection => {
    const text = editor.document.getText(selection);
    const textsByNewLine = text.split("\n");
    selectedTexts = [...textsByNewLine];
  });

  return selectedTexts;
}

function createCodeSnippets(selectedTexts: string[]): string {
  const codeSnippets = selectedTexts.map(text => {
    const trimmedText = removeSemiColonIfHaving(text.trim());

    return `	public with${capitalizeFirstLetter(trimmedText)}(${trimmedText}) {
		this.${trimmedText} = ${trimmedText};
		return this;
	}`;
  });
  return codeSnippets.join("\n\n") + "\n";
}

function removeSemiColonIfHaving(str: string): string {
  if (str.charAt(str.length - 1) === ";") {
    return str.slice(0, -1);
  }

  return str;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCodeSnippetsWithType(selectedTexts: string[]): string {
  const codeSnippets = selectedTexts.map(text => {
    let variableName = text.split(":")[0];

    variableName = variableName.trim();

    return `	public with${capitalizeFirstLetter(
      variableName
    )}(${variableName}: PleaseRenameThisType['${variableName}']) {
		this.${variableName} = ${variableName};
		return this;
	}`;
  });
  return codeSnippets.join("\n\n") + "\n";
}

export function deactivate() {}
