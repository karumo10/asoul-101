// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { totalMusicListProvider, MusicTreeItem } from './getMusics';
import { statusBarItemWrapper } from './statusBar';

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


let asoulStatusBarItemProvider = new statusBarItemWrapper();


export function activate(context: vscode.ExtensionContext) {
	

	vscode.window.showInformationMessage('Congratulations, your extension "asoul-101" is now active!');
	// vscode.window.registerTreeDataProvider(
	// 	'asoulSongs',
	// 	new asoulProvider()
	// );
	
	vscode.window.createTreeView('asoulSongs', {
		treeDataProvider: new asoulProvider()
	});

	let disposable1 = vscode.commands.registerCommand('asoul-101.helloWorld', () => {
		vscode.window.showInformationMessage('A-SOUL时代，沸腾期待!');
	});
	let disposable_diana = vscode.commands.registerCommand('asoul-101.diana', () => {
		vscode.window.showInformationMessage('关注嘉然顿顿解馋');
	});

	context.subscriptions.push(disposable1, disposable_diana, asoulStatusBarItemProvider.getItem());
	
}



// this method is called when your extension is deactivated
export function deactivate() {}
