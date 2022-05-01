(function () {
    const vscode = acquireVsCodeApi();
    function turnPlayToPause(music, music_btn) {
        var promise = music.play();
        if (promise !== undefined) {
            promise.then(_ => {
                music_btn.src=pauseUri;
            }).catch(err => {
                console.log(err);
            })
        }
    }
    function playPause() {
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        if (music.paused == true){
            turnPlayToPause(music, music_btn);
        }
        else {
            console.log("haha")
            var promise = music.pause();
            music_btn.src=playUri;
        }
    }
    var musicList = new Array();
    musicList = ["https://mknaifen-my.sharepoint.com/personal/nf_asoul-rec_com/_layouts/15/download.aspx?UniqueId=593fca5d-07e5-4c04-a047-ee3f6a97a69c&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbWtuYWlmZW4tbXkuc2hhcmVwb2ludC5jb21AYTcyNTRmOWEtNWMwNi00NDI1LThkZGUtZjVhMmExNzA0Zjc3IiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTY1MTQyNDk4NyIsImV4cCI6IjE2NTE0Mjg1ODciLCJlbmRwb2ludHVybCI6IjdQQTlqdGg3THowWmo2dmNscFA1K05uSW9CVENyV0xkWWRxejQxZFQ1VUk9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxNDgiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImNpZCI6IlpqVTBaVFprTURBdE5XUXhZUzAwTnpOa0xUa3lPRGd0TlRNM09USmpaR1JpTldVMyIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOR0UxWkRWaFpHTXROMkl6WmkwMFkyVTVMV0k1WWpZdFlUQmxNMkl5T1dZeE16WmwiLCJhcHBfZGlzcGxheW5hbWUiOiLlvZXmkq3nq5ktU3R1ZGlvIiwiZ2l2ZW5fbmFtZSI6IueyiSIsImZhbWlseV9uYW1lIjoi5aW257KJIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsImFwcGlkIjoiMDIxYWUyYjItODlkMC00NmY5LWFmOGItYThmMzdiNDJhZWE5IiwidGlkIjoiYTcyNTRmOWEtNWMwNi00NDI1LThkZGUtZjVhMmExNzA0Zjc3IiwidXBuIjoibmZAYXNvdWwtcmVjLmNvbSIsInB1aWQiOiIxMDAzMjAwMTlCOEZDM0I1IiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDE5YjhmYzNiNUBsaXZlLmNvbSIsInNjcCI6ImFsbGZpbGVzLnJlYWQgYWxsZmlsZXMud3JpdGUiLCJ0dCI6IjIiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjpudWxsLCJpcGFkZHIiOiIyMC4xOTAuMTMyLjEwNSJ9.U0dPTzVOcXFoZjN0S09mZlRxOXVsTG1KRkNBN1BoM0dXanRQREVoSjdyUT0&ApiVersion=2.0"]; //用数组存储所有歌曲的路径 测试：Quiet
    var num = 0;
    var n = musicList.length;//获取数组的长度
    function lastmusic() {
        num = (num+n-1)%n;
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        music.src = musicList[num];
        turnPlayToPause(music, music_btn);
    }//切上一首歌
    function nextmusic() {
        num = (num+1)%n;
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        music.src = musicList[num];
        turnPlayToPause(music, music_btn);
    }//切下一首歌
    window.onload=function () {
        music.addEventListener('ended', function () {
            nextmusic();
        },false)
    }//自动连播功能，监听播放情况，结束之后就调用下一首歌的函数
    document.getElementById('play').addEventListener('click', () => {
        playPause();
    });
    document.getElementById('next').addEventListener('click', () => {
        nextmusic();
    });
    document.getElementById('prev').addEventListener('click', () => {
        lastmusic();
    });
} ());
