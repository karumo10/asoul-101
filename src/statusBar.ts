import * as vscode from 'vscode'

export class statusBarItemWrapper {
    private item: vscode.StatusBarItem;
    // 封装一个 statusBarItem
    constructor() {
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 500);
        this.item.name = 'A-SOUL music player';
        this.item.text = `🎧魂歌🎤`;
        this.item.show();
    }

    getItem() : vscode.StatusBarItem {
        return this.item;
    }

}
