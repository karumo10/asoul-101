# A-SOUL Music Player on VS Code

🍦🍬🥣🐺✨ A-SOUL vscode 插件，让你一边写代码一边听 A-SOUL 的歌！ 🍦🍬🥣🐺✨

## Features

+ 安装插件后，点击侧边栏的图标可以进入本插件，开始加载曲库
+ 曲库加载完毕后，单击想听的歌即可加入当前歌单
+ 播放/上一首/下一首
+ 点击叉就可以将歌曲从歌单中删除
+ 采用列表循环，保持开启状态即可一直播放

## Acknowledgement
本插件是从 [A-SOUL 录音棚](studio.asf.ink) ([Github](https://github.com/chobitsnerv/lite-web-studio/tree/a-soul)) 获取歌单，并且从 @嘉然小姐的奶粉罐 维护的[曲库](https://as-archive-load-balance.kzmidc.workers.dev/Normalized%20Audio%20New/) 播放歌曲。

感谢录音棚网站的开发与维护人员，一直在维护A-SOUL音视频资源的@嘉然小姐的奶粉罐，以及提供 A-SOUL 歌曲资源的切片man们，没有你们对 A-SOUL 长久的热情和付出，本项目不可能实现。


## Requirements

由于本插件采用 Webview View & HTML Audio 进行播放，而 VS Code 方面长期以来均不提供 ffmpeg 支持，**VS Code 必须安装 ffmpeg 补丁才能正确运行本插件**！

### ffmpeg 补丁
首先按照如下办法安装 FFMPEG 的补丁，推荐 `Automatic Replacement`（来自[UNOFFICIAL Netease Music extension for Visual Studio Code 网易云音乐扩展](https://github.com/nondanee/vsc-netease-music)，感谢！）

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
#### 自行编译
```
1. `npm install`
2. `npm run watch`
3. 按 `F5` 新窗自动打开
```

#### 下载 release
下载 release 的 `asoul-101-0.0.1.vsix`后
```
code --install-extension .\asoul-101-0.0.1.vsix
```

## Extension Settings

Treeview 显示歌单，Webview view 音乐播放

## Known Issues

1. 播放一些体积较大的歌曲时，可能需要稍等片刻
2. 有时播放按钮会遇到卡顿的情况，这是歌曲资源尚未加载完毕导致的，可以多点击几次播放按钮或者更换良好的网络环境。流媒体资源来自 Onedrive 网盘，实测无论是否使用代理均较快。

## Future Plan

添加搜索歌曲功能；添加歌曲进度条；添加音量控制；添加单曲循环、随机播放功能

## Release Notes

2022/5/4 ver 0.0.1 发布
