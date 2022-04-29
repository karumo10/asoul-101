// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { totalMusicListProvider, MusicTreeItem } from './getMusics';

export class asoulProvider implements vscode.TreeDataProvider <MusicTreeItem> {
	constructor() {}

	getTreeItem(element: MusicTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: MusicTreeItem): Thenable<MusicTreeItem[]> {
		let provider = new totalMusicListProvider();
		if (element) {
			return Promise.resolve([]);
		} else {
			// provider.fetchMusicList();
			// provider.fetchMusicList(); // refresh immediately
			return provider.getMusicTreeNodes();
		}
	}
}



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('Congratulations, your extension "asoul-101" is now active!');
	// vscode.window.registerTreeDataProvider(
	// 	'asoulSongs',
	// 	new asoulProvider()
	// );
	
	vscode.window.createTreeView('asoulSongs', {
		treeDataProvider: new asoulProvider()
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('asoul-101.helloWorld', () => {
		vscode.window.showInformationMessage('A-SOUL时代，沸腾期待!');
	});
	let disposable_diana = vscode.commands.registerCommand('asoul-101.diana', () => {
		vscode.window.showInformationMessage('关注嘉然顿顿解馋');
	});
	context.subscriptions.push(disposable1, disposable_diana);
}

// this method is called when your extension is deactivated
export function deactivate() {}
