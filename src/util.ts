const axios = require('axios');
import * as vscode from 'vscode'

export class musicRawProvider {
    musicLink: string;
    constructor() {
        this.musicLink = '';
    }
    private async fetchMusicLink(oneDriveLink: string) : Promise<any> {
        // 从onedrive链接获取音乐链接
        return axios(
            {
                method: 'get',
                url: oneDriveLink,
                responseType: 'text'
            }
        ).then( (response: any) => {
            this.musicLink = response.data.match(/url: \'(.*?)\'/)[0]; // 获取匹配列表第一个即可，实际可能会有多个匹配，大概都是valid的
        }).catch((error: any) => {
            vscode.window.showErrorMessage(error);
        })
    }

    public async getMusicLink(oneDriveLink: string) : Promise<string> {
        await this.fetchMusicLink(oneDriveLink);
        return this.musicLink;
    }
}