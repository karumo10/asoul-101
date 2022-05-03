// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TotalMusicListProvider, MusicTreeItem, MusicRecord } from './getMusics';
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


let asoulProvider = new AsoulProvider();

export function activate(context: vscode.ExtensionContext) {
	
	vscode.window.showInformationMessage('A-SOUL 音乐播放器 已经激活~');
	// vscode.window.registerTreeDataProvider(
	// 	'asoulSongs',
	// 	new asoulProvider()
	// );
	

	vscode.window.createTreeView('asoul-101.asoulSongs', {
		treeDataProvider: asoulProvider
	});


	const musicPlayerProvider = new MusicPlayer(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(MusicPlayer.viewType, musicPlayerProvider));
	
	let sendMusicInformToPlayer = vscode.commands.registerCommand('asoul-101.musicSelect', (label) => {
		vscode.window.showInformationMessage('已将 ' + label + ' 加入歌单');
		musicPlayerProvider.sendMusicInformToPlayer(label); // 组成OneDrive链接

	});
	
	context.subscriptions.push(
		sendMusicInformToPlayer
	);

}



// this method is called when your extension is deactivated
export function deactivate() {}
function list(list: any): (...args: any[]) => any {
	throw new Error('Function not implemented.');
}

