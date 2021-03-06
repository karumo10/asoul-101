<div align="center"> 


<img src="https://raw.githubusercontent.com/karumo10/asoul-101/main/assets/ext-logo.png" alt="icon" width="256px">

# A-SOUL Music Player on VS Code




ð¦ð¬ð¥£ðºâ¨ A-SOUL vscode æä»¶ï¼è®©ä½ ä¸è¾¹åä»£ç ä¸è¾¹å¬ A-SOUL çæ­ï¼ ð¦ð¬ð¥£ðºâ¨


</div>

<div align="right"> 

#### ðµãæä½ çéªä¼´ï¼ä»ä¸è§å­¤åãðµ ââ åºãè¶çº§ææãåå¸ä¸å¨å¹´

</div>

*\*æ¬é¡¹ç®å·²åå ç¨åæé 2022 ç¼ç¨ææèµï¼ éä¼åï¼å¯æ¯èå¨æï¼ä½åé¾æ¥[å¨è¿é](https://hackathon2022.juejin.cn/#/works/detail?unique=YfGUyQ0sUy_Cljd7BlL98g)ï¼æ¬¢è¿æç¥¨æ*
## Features

+ å®è£æä»¶åï¼ç¹å»ä¾§è¾¹æ çå¾æ å¯ä»¥è¿å¥æ¬æä»¶ï¼å¼å§å è½½æ²åº
+ æ²åºå è½½å®æ¯åï¼åå»æ³å¬çæ­å³å¯å å¥å½åæ­å
+ æ­æ¾/ä¸ä¸é¦/ä¸ä¸é¦
+ ç¹å»åå°±å¯ä»¥å°æ­æ²ä»æ­åä¸­å é¤
+ éç¨åè¡¨å¾ªç¯ï¼ä¿æå¼å¯ç¶æå³å¯ä¸ç´æ­æ¾
+ å¯åå°æ­æ¾ï¼ä½ å¯ä»¥ä¸è¾¹ debug ä¸è¾¹äº«åé³ä¹ (2022/5/6 æ°å¢)

## Acknowledgement
æ¬æä»¶æ¯ä» [A-SOUL å½é³æ£](studio.asf.ink) ([Github](https://github.com/chobitsnerv/lite-web-studio/tree/a-soul)) è·åæ­åï¼å¹¶ä¸ä»ç± [A-soul Studio åå®¹ç»](https://space.bilibili.com/674044855) ç»´æ¤ï¼[@åç¶å°å§çå¥¶ç²ç½](https://space.bilibili.com/5273959) æç®¡ç [æ²åº](https://as-archive-load-balance.kzmidc.workers.dev/Normalized%20Audio%20New/) æ­æ¾æ­æ²ã

æè°¢å½é³æ£ç½ç«çå¼åä¸ç»´æ¤äººåï¼ä¸ç´å¨åçå¹¶æ´çA-SOULé³é¢èµæºç [A-soul Studio åå®¹ç»](https://space.bilibili.com/674044855)ï¼æ²¡æä½ ä»¬å¯¹ A-SOUL é¿ä¹çç­æåä»åºï¼æ¬é¡¹ç®ä¸å¯è½å®ç°ã


## Requirements

ç±äºæ¬æä»¶éç¨ Webview View & HTML Audio è¿è¡æ­æ¾ï¼è VS Code æ¹é¢é¿æä»¥æ¥åä¸æä¾ ffmpeg æ¯æï¼**VS Code å¿é¡»å®è£ ffmpeg è¡¥ä¸æè½æ­£ç¡®è¿è¡æ¬æä»¶**ï¼

### ffmpeg è¡¥ä¸
é¦åæç§å¦ä¸åæ³å®è£ FFMPEG çè¡¥ä¸ï¼æ¨è `Automatic Replacement`ï¼æ¥èª[UNOFFICIAL Netease Music extension for Visual Studio Code ç½æäºé³ä¹æ©å±](https://github.com/nondanee/vsc-netease-music)ï¼æè°¢ï¼ï¼

[VS Code ä½¿ç¨ç Electron çæ¬ä¸åå« ffmpeg](https://stackoverflow.com/a/51735036)ï¼éæ¿æ¢èªå¸¦ç ffmpeg å¨æé¾æ¥åºæè½æ­£å¸¸æ­æ¾ (æ¯æ¬¡æ´æ° VS Code é½ééæ°æ¿æ¢)

*VS Code for Windows 1.31.0 - 1.35.1 ä¸éæ¿æ¢ï¼1.36.0 åæ æ­¤å¾é*

*VS Code for macOS 1.43+ æ¿æ¢åéªé[è§£å³æ¹æ¡](https://github.com/nondanee/vsc-netease-music/issues/86#issuecomment-786546931)*

<details><summary>
<b>Manual Replacement</b>
</summary>

éè¿ VS Code çæ¬å¨ `https://raw.githubusercontent.com/Microsoft/vscode/%version%/.yarnrc` æ¥çå¶ä½¿ç¨ç Electron çæ¬ï¼å¹¶äº `https://github.com/electron/electron/releases/tag/%version%` ä¸è½½å¯¹åºç **Electron å®æ´çæ¬**è¿è¡æ¿æ¢

#### Windows
ä¸è½½ **electron-%version%-win32-%arch%.zip**

æ¿æ¢ `./ffmpeg.dll`

#### macOS
ä¸è½½ **electron-%version%-darwin-x64.zip**

æ¿æ¢ `./Electron.app/Contents/Frameworks/Electron\ Framework.framework/Libraries/libffmpeg.dylib`

#### Linux
ä¸è½½ **electron-%version%-linux-%arch%.zip**

æ¿æ¢ `./libffmpeg.so`

</details>

<details><summary>
<b>Automatic Replacement</b>
</summary>

ä½¿ç¨ Python èæ¬æ¿æ¢ (ä½¿ç¨[æ·å® Electron éå](https://npm.taobao.org/mirrors/electron/)ï¼å¼å®¹ Python 2/3ï¼ç»å¤§é¨ååè¡çèªå¸¦ç¯å¢)

**é»è®¤å®è£ä½ç½®ä¸ Linux å Windows éè¦ä»¥ç®¡çåèº«ä»½è¿è¡ï¼macOS ä¸éè¦**

#### Windows Powershell

```powershell
Invoke-RestMethod https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

#### Unix Shell

```
curl https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

å¦æ VS Code ä½¿ç¨é»è®¤éç½®å®è£ï¼èæ¬ä¼èªå¨å¯»æ¾å¹¶æ¿æ¢ï¼è¥èªå®ä¹äºå®è£ä½ç½®ï¼è¯·èªè¡ä¿®æ¹ [installation](https://gist.github.com/nondanee/f157bbbccecfe29e48d87273cd02e213#file-helper-py-L20)

</details>


### å¦ä½è¿è¡æ©å±
#### èªè¡ç¼è¯
```
1. `npm install`
2. `npm run watch`
3. æ `F5` æ°çªèªå¨æå¼
```

#### ä¸è½½ release
ä¸è½½ release ç `asoul-101-0.0.1.vsix`å
```
code --install-extension .\asoul-101-0.0.1.vsix
```

## Extension Settings

Treeview æ¾ç¤ºæ­åï¼Webview view é³ä¹æ­æ¾

## Known Issues

1. æ­æ¾ä¸äºä½ç§¯è¾å¤§çæ­æ²æ¶ï¼å¯è½éè¦ç¨ç­çå»
2. ææ¶æ­æ¾æé®ä¼éå°å¡é¡¿çæåµï¼è¿æ¯æ­æ²èµæºå°æªå è½½å®æ¯å¯¼è´çï¼å¯ä»¥å¤ç¹å»å æ¬¡æ­æ¾æé®æèæ´æ¢è¯å¥½çç½ç»ç¯å¢ãæµåªä½èµæºæ¥èª Onedrive ç½çï¼å®æµæ è®ºæ¯å¦ä½¿ç¨ä»£çåè¾å¿«ã

## Future Plan

æ·»å æç´¢æ­æ²åè½ï¼æ·»å æ­æ²è¿åº¦æ¡ï¼æ·»å é³éæ§å¶ï¼æ·»å åæ²å¾ªç¯ãéæºæ­æ¾åè½

## Release Notes

2022/5/4 ver 0.0.1 åå¸
2022/5/5 ver 0.0.2 æ´æ° icon
2022/5/6 ver 0.0.3 æ¯æåå°æ­æ¾
