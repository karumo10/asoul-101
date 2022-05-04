# asoul-101 README

🍦🍬🥣🐺✨ A-SOUL vscode 插件，让你一边写代码一边溜 A-SOUL 的歌！ 🍦🍬🥣🐺✨

## Features

从 [A-SOUL 录音棚](studio.asf.ink) ([Github](https://github.com/chobitsnerv/lite-web-studio/tree/a-soul)) 获取歌单，并且播放

感谢录音棚网站的开发与维护人员，一直在维护A-SOUL音视频资源的@嘉然小姐的奶粉罐，以及提供 A-SOUL 歌曲资源的切片man们，没有你们对 A-SOUL 长久的热情和付出，本项目不可能实现


## Requirements

参见 `package.json` 

### ffmpeg 补丁
首先按照如下办法安装 FFMPEG 的补丁（来自[UNOFFICIAL Netease Music extension for Visual Studio Code 网易云音乐扩展](https://github.com/nondanee/vsc-netease-music)，感谢！）

[VS Code 使用的 Electron 版本不包含 ffmpeg](https://stackoverflow.com/a/51735036)，需替换自带的 ffmpeg 动态链接库才能正常播放 (每次更新 VS Code 都需重新替换)

*VS Code for Windows 1.31.0 - 1.35.1 不需替换，1.36.0 后无此待遇*

*VS Code for macOS 1.43+ 替换后闪退[解决方案](https://github.com/nondanee/vsc-netease-music/issues/86#issuecomment-786546931)*

<details><summary>
<b>Manual Replacement</b>
</summary>

通过 VS Code 版本在 `https://raw.githubusercontent.com/Microsoft/vscode/%version%/.yarnrc` 查看其使用的 Electron 版本，并于 `https://github.com/electron/electron/releases/tag/%version%` 下载对应的 **Electron 完整版本**进行替换

#### Windows
下载 **electron-%version%-win32-%arch%.zip**

替换 `./ffmpeg.dll`

#### macOS
下载 **electron-%version%-darwin-x64.zip**

替换 `./Electron.app/Contents/Frameworks/Electron\ Framework.framework/Libraries/libffmpeg.dylib`

#### Linux
下载 **electron-%version%-linux-%arch%.zip**

替换 `./libffmpeg.so`

</details>

<details><summary>
<b>Automatic Replacement</b>
</summary>

使用 Python 脚本替换 (使用[淘宝 Electron 镜像](https://npm.taobao.org/mirrors/electron/)，兼容 Python 2/3，绝大部分发行版自带环境)

**默认安装位置下 Linux 和 Windows 需要以管理员身份运行，macOS 不需要**

#### Windows Powershell

```powershell
Invoke-RestMethod https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

#### Unix Shell

```
curl https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

如果 VS Code 使用默认配置安装，脚本会自动寻找并替换，若自定义了安装位置，请自行修改 [installation](https://gist.github.com/nondanee/f157bbbccecfe29e48d87273cd02e213#file-helper-py-L20)

</details>


### 如何运行扩展
1. `npm install`
2. `npm run watch`
3. 按 `F5` 新窗自动打开

## Extension Settings

Treeview 显示歌单，Webview view 音乐播放

## Known Issues

暂无

## Future Plan

添加搜索歌曲功能；添加歌曲进度条；添加音量控制；添加单曲循环、随机播放功能

## Release Notes

N/A
