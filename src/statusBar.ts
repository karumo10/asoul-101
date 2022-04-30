import * as vscode from 'vscode'

export class StatusBarItemWrapper {
    private item: vscode.StatusBarItem;
    // 封装一个 statusBarItem
    constructor() {
        this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.item.name = 'A-SOUL music player';
        this.item.text = `🎧A-SOUL🎤  $(debug-pause)  $(debug-continue)`;
        this.item.show();
    }

    getItem() : vscode.StatusBarItem {
        return this.item;
    }

}
