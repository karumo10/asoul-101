(function () {
    const vscode = acquireVsCodeApi();
    function turnPlayFromPause(music, playButton, pauseButton) {
        var promise = music.play();
        if (promise !== undefined) {
            promise.then(_ => {
                // music_btn.src=pauseUri;
                playButton.style.display = "none";
                pauseButton.style.display = "block";
            }).catch(err => {
                console.log(err);
            });
        }
    }
    function turnPauseFromPlay(music, playButton, pauseButton) {
        music.pause();
        console.log("haha");
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    }
    function playPause() {
        var music = document.getElementById('music');
        var musicPlayButton = document.getElementById('play');
        var musicPauseButton = document.getElementById('pause');
        if (music.paused == true){
            turnPlayFromPause(music, musicPlayButton, musicPauseButton);
        }
        else {
            turnPauseFromPlay(music, musicPlayButton, musicPauseButton);
        }
    }
    class MusicListNode {
        constructor(music) {
            this.music = music;
            this.prev = null;
            this.next = null;
        }
    }
    class MusicLinkedList {
        constructor() {
            this.head = new MusicListNode(""); // dummy node
        }
        addMusic(music) { // add at second place
            var currNode = new MusicListNode(music);
            currNode.prev = null;
            currNode.next = null;
            if (!this.head || this.head.music == "") {
                console.log("insert head");
                this.head = currNode;
            } else {
                // 插在第二个（下一首播放）
                currNode.next = this.head.next;
                if (this.head.next != null) {
                    this.head.next.prev = currNode;
                }
                this.head.next = currNode;
                currNode.prev = this.head;
            }
        }
    }
    var musicLinkedList = new MusicLinkedList();
    var currentNode = musicLinkedList.head;

    window.addEventListener('message', event => {
        // receive msg from extension (music raw link)
        const msg = event.data;
        const newMusicLink = msg.link;
        console.log("add one music:" + newMusicLink);
        musicLinkedList.addMusic(newMusicLink);
        if (currentNode.music == "") {
            currentNode = musicLinkedList.head;
            var music = document.getElementById('music');
            music.src = currentNode.music;
        }
        console.log(currentNode.music);
    }) 
    // var num = 0;
    // var n = musicList.length;//获取数组的长度
    function lastmusic() {
        // num = (num+n-1)%n;
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        // music.src = musicList[num];
        music.src = currentNode.prev.music;
        currentNode = currentNode.prev;
        turnPlayFromPause(music, music_btn);
    }//切上一首歌
    function nextmusic() {
        // num = (num+1)%n;
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        music.src = currentNode.next.music;
        currentNode = currentNode.next;
        // music.src = musicList[num];
        turnPlayFromPause(music, music_btn);
    }//切下一首歌
    window.onload=function () {
        music.addEventListener('ended', function () {
            nextmusic();
        },false)
    }//自动连播功能，监听播放情况，结束之后就调用下一首歌的函数
    document.getElementById('play').addEventListener('click', () => {
        playPause();
    });
    document.getElementById('pause').addEventListener('click', () => {
        playPause();
    });
    document.getElementById('next').addEventListener('click', () => {
        nextmusic();
    });
    document.getElementById('prev').addEventListener('click', () => {
        lastmusic();
    });
} ());
