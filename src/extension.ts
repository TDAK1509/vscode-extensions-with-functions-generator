// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "builder-snippets.helloWorld",
    async () => {
      const clipboardContent = await vscode.env.clipboard.readText();
      const editor = vscode.window.activeTextEditor as vscode.TextEditor;
      await vscode.commands.executeCommand("editor.action.jumpToBracket");

      editor?.edit(textEditorEdit => {
        const position = editor.selection.active;
        textEditorEdit.insert(position, createCodeSnippets(clipboardContent));
      });
    }
  );

  context.subscriptions.push(disposable);
}

function createCodeSnippets(content: string) {
  const contentByNewLine = content.split("\n");
  const codeSnippets = contentByNewLine.map(text => {
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
