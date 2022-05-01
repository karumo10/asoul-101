// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TotalMusicListProvider, MusicTreeItem, MusicRecord } from './getMusics';
import { StatusBarItemWrapper } from './statusBar';
import { MusicPlayer } from './musicPlayer'

export class AsoulProvider implements vscode.TreeDataProvider <MusicTreeItem> {
	// private musicResourceList : string[];
	private musicListProvider : TotalMusicListProvider;
	constructor() {
		// this.musicResourceList = [''];
		this.musicListProvider = new TotalMusicListProvider();
	}

	getTreeItem(element: MusicTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: MusicTreeItem): Thenable<MusicTreeItem[]> {
		let provider = this.musicListProvider;
		if (element) {
			return Promise.resolve([]);
		} else {
			// provider.fetchMusicList();
			// provider.fetchMusicList(); // refresh immediately
			return provider.getMusicTreeNodes();
		}
	}

	getTotalMusicList(): MusicRecord[] {
		return this.musicListProvider.getTotalMusicList();
	}
}


let asoulStatusBarItemProvider = new StatusBarItemWrapper();
let asoulProvider = new AsoulProvider();

export function activate(context: vscode.ExtensionContext) {
	
	vscode.window.showInformationMessage('Congratulations, your extension "asoul-101" is now active!');
	// vscode.window.registerTreeDataProvider(
	// 	'asoulSongs',
	// 	new asoulProvider()
	// );
	

	vscode.window.createTreeView('asoul-101.asoulSongs', {
		treeDataProvider: asoulProvider
	});

	let disposable1 = vscode.commands.registerCommand('asoul-101.helloWorld', () => {
		vscode.window.showInformationMessage('A-SOUL时代，沸腾期待!');
	});
	let disposable_diana = vscode.commands.registerCommand('asoul-101.diana', () => {
		vscode.window.showInformationMessage('关注嘉然顿顿解馋');
	});
	let checkSongListLength = vscode.commands.registerCommand('asoul-101.showSongList', () => {
		vscode.window.showInformationMessage('length is ' + asoulProvider.getTotalMusicList().length);
	});


	context.subscriptions.push(disposable1, disposable_diana, asoulStatusBarItemProvider.getItem(), checkSongListLength);

	const musicPlayerProvider = new MusicPlayer(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(MusicPlayer.viewType, musicPlayerProvider));

}



// this method is called when your extension is deactivated
export function deactivate() {}
