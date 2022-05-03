import * as vscode from 'vscode'
import * as util from './util'

export class MusicPlayer implements vscode.WebviewViewProvider {
    public static readonly viewType = 'asoul-101.musicPlayer';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }
	
	public async sendMusicInformToPlayer(link : string) {
		// send the link of music resource
		if (this._view) {
			vscode.window.showInformationMessage('showing the link: ' + link);
			const musicRawProvider = new util.MusicRawProvider(); 
			let rawLink = await musicRawProvider.getMusicLink(link);
			vscode.window.showInformationMessage(rawLink);
			this._view.webview.postMessage({ link: rawLink, name : link });
			// link: 歌曲实际播放地址
			// name：歌曲的识别名 eg. 2021.03.17 C 云烟成雨【3.0】.m4a
		}
	}



    private getHtmlForWebview(webview: vscode.Webview) {

		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const playUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'play.png'));
		const pauseUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'pause.png'));
		const prevUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'prev.png'));
		const nextUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'next.png'));
		const delUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'delete.png'));
		let content = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				#pause {
					display:none;
				}
				#control {
					padding: 10px;
				}
				.songItem {
					border: 2px solid white;
					border-radius: 25px;
					padding: 10px;
					margin: 10px;
				}
				#songList {
					list-style: none;
				}
				.del {
					display: inline;
					float: right;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: url("${delUri}") no-repeat;
					background-color: #ffffff;
					background-size: cover
				}
				.songText {
					display: inline;
				}
			</style>
			<title>Document</title>
		</head>
		<body>
			<audio preload id='music'><source src=""></audio>
			<div id="control">
			<center>
				<button id="prev"><img src="${prevUri}" width="20" height="20" border="0"></button>
				<button id="play"><img src="${playUri}" width="20" height="20" border="0"></button>
				<button id="pause"><img src="${pauseUri}" width="20" height="20" border="0"></button>
				<button id="next"><img src="${nextUri}" width="20" height="20" border="0"></button>
			</center>
			</div>
			<h4> 当前歌单 </h4>
			<ol id="songList">
				
			</ol>
			<script>{{extraContent}}</script>
			<script src="${scriptUri}"}></script>
			
	
		</body>
		</html>`;
		content = content.replace('{{extraContent}}', 'const pauseUri=\'sadsa\'; const playUri=\'${playUri}\'')
		return content;
    }
	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
    }
}