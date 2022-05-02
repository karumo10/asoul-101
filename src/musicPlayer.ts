import * as vscode from 'vscode'

export class MusicPlayer implements vscode.WebviewViewProvider {
    public static readonly viewType = 'asoul-101.musicPlayer';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }
	
	public sendMusicInformToPlayer(link : string) {
		// send the link of music resource
		if (!this._view) {
			vscode.window.showInformationMessage('no view!');
			return;
		} else {
			vscode.window.showInformationMessage('showing the link: ' + link);
			// this._view.webview.postMessage({ link: link });
		}
	}



    private getHtmlForWebview(webview: vscode.Webview) {

		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const playUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'play.png'));
		const pauseUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'pause.png'));
		const prevUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'prev.png'));
		const nextUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'next.png'));
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

			</style>
			<title>Document</title>
		</head>
		<body>
			<audio preload id='music'><source src="https://mknaifen-my.sharepoint.com/personal/nf_asoul-rec_com/_layouts/15/download.aspx?UniqueId=593fca5d-07e5-4c04-a047-ee3f6a97a69c&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbWtuYWlmZW4tbXkuc2hhcmVwb2ludC5jb21AYTcyNTRmOWEtNWMwNi00NDI1LThkZGUtZjVhMmExNzA0Zjc3IiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTY1MTQzMTQ2MCIsImV4cCI6IjE2NTE0MzUwNjAiLCJlbmRwb2ludHVybCI6IjdQQTlqdGg3THowWmo2dmNscFA1K05uSW9CVENyV0xkWWRxejQxZFQ1VUk9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxNDgiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImNpZCI6Ik1EVXdaVGhrT0RndE0ySmhaQzAwT0dObExXSXdNamd0WTJNeU5qZGxNamszWldJMiIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOR0UxWkRWaFpHTXROMkl6WmkwMFkyVTVMV0k1WWpZdFlUQmxNMkl5T1dZeE16WmwiLCJhcHBfZGlzcGxheW5hbWUiOiLlvZXmkq3nq5ktU3R1ZGlvIiwiZ2l2ZW5fbmFtZSI6IueyiSIsImZhbWlseV9uYW1lIjoi5aW257KJIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsImFwcGlkIjoiMDIxYWUyYjItODlkMC00NmY5LWFmOGItYThmMzdiNDJhZWE5IiwidGlkIjoiYTcyNTRmOWEtNWMwNi00NDI1LThkZGUtZjVhMmExNzA0Zjc3IiwidXBuIjoibmZAYXNvdWwtcmVjLmNvbSIsInB1aWQiOiIxMDAzMjAwMTlCOEZDM0I1IiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDE5YjhmYzNiNUBsaXZlLmNvbSIsInNjcCI6ImFsbGZpbGVzLnJlYWQgYWxsZmlsZXMud3JpdGUiLCJ0dCI6IjIiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjpudWxsLCJpcGFkZHIiOiI0MC4xMjYuNC40MCJ9.KzBSTytyUi9NakcvMEYzdEU0Yks2UG9QNzNxVXZzMndlb0JDYmJqTnVYST0&ApiVersion=2.0"></audio>
			<button id="prev"><img src="${prevUri}" width="96" height="96" border="0"></button>
			<button id="play"><img src="${playUri}" width="96" height="96" border="0"></button>
			<button id="pause"><img src="${pauseUri}" width="96" height="96" border="0"></button>
			<button id="next"><img src="${nextUri}" width="96" height="96" border="0"></button>
			<script>{{extraContent}}</script>
			<script src="${scriptUri}"}></script>
			<!-- 插入图片且引用上面的函数，实现功能 -->
	
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