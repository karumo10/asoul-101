import { request } from "http";
// import * as axios from 'axios';
import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync';
import { promisify } from "util";

const axios = require('axios');

type MusicRecord = {
    id: string,
    日期: string,
    录播来源: string,
    录播片段编号: string,
    起始时间点: string,
    结束时间点: string,
    文件名: string,
    文件类型: string,
    歌名: string,
    版本号: string,
    版本备注: string,
    中文歌名: string,
    原曲艺术家: string,
    演唱者: string,
    演唱状态: string,
    语言: string,
    备注: string,
    参考路灯man: string,
    有没有音频: string,
    切片源: string,
    有没有第二版本: string,
    第二版文件类型: string
}

export class totalMusicListProvider {
    constructor() {}
    private async fetchMusicList() : Promise<any> {
        // get the song database csv
        return axios(
            {
                method: 'get',
                url: 'https://csv-db.studio.asf.ink/song_database.csv',
                responseType: 'text'
            }
        ).then( (response: any) => {
            const csvFilePath = path.resolve(__dirname, 'songDB.csv');
            fs.writeFileSync(csvFilePath, response.data);
            vscode.window.showInformationMessage('successfully download the song db!');
        }).catch((error: any) => {
            vscode.window.showErrorMessage(error)
        })
    }

    

    private getTotalMusicList() : MusicRecord[] {
        // get all the music listed.
        const csvFilePath = path.resolve(__dirname, 'songDB.csv');
    
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        
        const records = parse(fileContent, {
            delimiter : ',',
            columns: true,
        });

        return records;
    }


    

    async getMusicTreeNodes() : Promise<MusicTreeItem[]> {
        await this.fetchMusicList();
        const musicRecords = this.getTotalMusicList();
        return musicRecords.map((musicRec : MusicRecord) => {
            return new MusicTreeItem(this.parseSongLabel(musicRec), musicRec.歌名, musicRec.演唱者, musicRec.日期, vscode.TreeItemCollapsibleState.Collapsed);
        });
    }

    private mapSingerNameToId(singerName: string): string {
        const arr : string[] = singerName.split(",");
        if (arr.length >= 4) {
            return 'F';
        } // 大于四名成员直接返回F（团曲）
        const mappedArr : string[] = arr.map((singleSingerName: string) => {
            if (singleSingerName == '向晚') {
                return 'A';
            } else if (singleSingerName == '贝拉') {
                return 'B';
            } else if (singleSingerName == '珈乐') {
                return 'C';
            } else if (singleSingerName == '嘉然') {
                return 'D';
            } else if (singleSingerName == '乃琳') {
                return 'E';
            } else if (singleSingerName == 'A-SOUL') {
                return 'F'; // 团曲
            } else {
                return 'L'; // 联动
            }
        })
        if (mappedArr.includes('L')) {
            return 'L'; // 存在联动，只返回L（联动）
        } else if (mappedArr.includes('F')) {
            return 'F';
        } else {
            return mappedArr.join();
        }
        
    }

    private parseSongLabel(rawSongRecord: MusicRecord): string { 
        // 返回标签，作为unique标识符
        // const uniformAddr = 'https://as-archive-load-balance.kzmidc.workers.dev/Normalized%20Audio%20New/';
        const date: string = rawSongRecord.日期;
        const singerName: string = rawSongRecord.演唱者;
        const songName: string = rawSongRecord.歌名;
        const version: string = rawSongRecord.版本号;
        const note: string = rawSongRecord.版本备注;
        const fileExt: string = rawSongRecord.文件类型;

        let singerId: string = this.mapSingerNameToId(singerName);
        let braceNote = '';
        if (version != '' && note != '') {
            if (version == '') {
                braceNote = '【' + note + '】';
            } else if (note == '') {
                braceNote = '【' + version + '】';
            } else {
                braceNote = '【' + version + ' ' + note + '】';
            }
        }
        return date + ' ' + singerId + ' ' + songName + braceNote + '.' + fileExt; 
        // space will be autoly turned to %20 by OneDrive
    }
}

export class MusicTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string, /* 格式化名，直接可以用作歌曲资源寻址 */
		private songName: string,
		private singerName: string,
        private date: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	  ) {
		super(label, collapsibleState);
		this.tooltip = `${this.songName} - ${this.singerName}`;
		this.description = this.tooltip;
	  }
}

/* '时间+空格+参与者代号+空格+歌曲名称【版本号+空格+版本备注】.文件类型'
* 直接黏贴在网盘地址后面就是歌曲地址
* https://as-archive-load-balance.kzmidc.workers.dev/Normalized%20Audio%20New/
* 参与者需要映射
    例1（单人演唱）
    2022.03.02 E 牛奶面包.m4a
    时间：2022.03.02
    参与者：E，Eileen，代表乃琳
    歌曲名称：牛奶面包

    例2（2-3人合作）
    2021.09.21 CD 青城山下白素贞.m4a
    参与者：CD，"珈乐,嘉然"，按字母顺序排序
    2022.02.04 ADE 吉祥三宝.m4a
    参与者：ADE，"向晚,嘉然,乃琳"，按字母顺序排序
    注：合作歌曲包括所有参与者，如《花海》由向晚伴奏，乃琳演唱，标为AE
    《繁花》由贝拉伴舞，乃琳演唱，标为BE

    例3（4-5人合作，F）
    2022.02.03 F 一千零一个愿望.m4a
    参与成员代号：F，4-5位成员参与

    例4（联动，L）
    2021.04.17 L Hopeful Dreamer【合唱版】.mp3
    参与者："嘉然,中国绊爱"
    2022.02.03 L 除夕【团曲】.mp3
    参与者："A-SOUL,音阙诗听"

    例5（版本号 版本备注）
    2021.10.28 DE 私奔到月球【2.0】.m4a
    2022.01.14 E Sweet Counter【单曲】.m4a
    2022.01.05 C 芒种【2.0 预录】.m4a
* 例子： 2020.12.04 Quite 【团曲】.文件类型
*/