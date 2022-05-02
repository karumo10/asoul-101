const axios = require('axios');
import * as vscode from 'vscode'

export class MusicRawProvider {
    private musicLink: string;
    constructor() {
        this.musicLink = '';
    }
    private async fetchMusicLink(oneDriveLink: string) : Promise<any> {
        // 从onedrive链接获取音乐链接
        return axios(
            {
                method: 'get',
                url: 'https://as-archive-load-balance.kzmidc.workers.dev/Normalized%20Audio%20New/' + encodeURI(oneDriveLink),
                responseType: 'text'
            }
        ).then( (response: any) => {
            const arr = [...response.data.matchAll(/url: \'(.*?)\'/g)];
            this.musicLink = arr[0][1]; // 获取匹配列表第一个即可，实际可能会有多个匹配，大概都是valid的
        }).catch((error: any) => {
            vscode.window.showErrorMessage(error);
        })
    }

    public async getMusicLink(oneDriveLink: string) : Promise<string> {
        await this.fetchMusicLink(oneDriveLink);
        return this.musicLink;
    }
}