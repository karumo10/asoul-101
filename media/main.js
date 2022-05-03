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
        constructor(music, name) {
            this.music = music;
            this.name = name;
            this.prev = null;
            this.next = null;
        }
    }
    // circular list
    class MusicLinkedList {
        constructor() {
            this.head = new MusicListNode("", "noname"); // dummy node
            this.head.next = this.head;
            this.head.prev = this.head;
            this.length = 0;
        }
        addMusic(music, name, playingNode) { // add at second place
            this.length = this.length + 1; // 歌曲列表增长1
            var currNode = new MusicListNode(music, name);
            currNode.prev = null;
            currNode.next = null;
            if (!this.head || this.head.music == "") {
                console.log("insert head");
                this.head = currNode;
                this.head.next = this.head;
                this.head.prev = this.head;
            } else {
                // 下一首播放
                currNode.next = playingNode.next;
                if (playingNode.next != null) {
                    playingNode.next.prev = currNode;
                }
                playingNode.next = currNode;
                currNode.prev = playingNode;
            }
        }
    }
    var musicLinkedList = new MusicLinkedList();
    var currentNode = musicLinkedList.head; // 当前正在播放的歌曲在链表中的节点
    var currentSongId = 0; // 当前正在播放的歌曲的<li> id

    window.addEventListener('message', event => {
        // receive msg from extension
        const msg = event.data;
        const newMusicLink = msg.link;
        const musicName = msg.name;
            // link: 歌曲实际播放地址
			// name：歌曲的识别名 eg. 2021.03.17 C 云烟成雨【3.0】.m4a
        console.log("成功添加歌曲：" + musicName);
        musicLinkedList.addMusic(newMusicLink, musicName, currentNode);
        if (currentNode.music == "") { 
            currentNode = musicLinkedList.head;
            var music = document.getElementById('music');
            music.src = currentNode.music;
        }
        updateSongList(musicLinkedList, currentSongId);
    });

    function updateSongList(musicLinkedList, currId) {
        var list = document.getElementById("songList");
        // var currentSong = document.createElement("li");
        list.innerHTML = ""; // clear all
        var curr = musicLinkedList.head;
        var index = 0; // song index, which will become id
        while (1) {
            var currentSongLi = document.createElement("li");
            currentSongLi.append(document.createTextNode(curr.name));
            currentSongLi.setAttribute('id', index.toString());
            if (index == currId) {
                currentSongLi.style.fontWeight="bolder";
            }
            list.appendChild(currentSongLi);
            curr = curr.next;
            index = index + 1;
            if (curr == musicLinkedList.head) {
                break;
            }
        }
        // currentSong.appendChild(document.createTextNode(musicName));
        // list.appendChild(currentSong);
    }
    // var num = 0;
    // var n = musicList.length;//获取数组的长度
    function lastmusic() {
        currentSongId = (currentSongId - 1) % musicLinkedList.length;
        console.log("curr="+currentSongId.toString()+";len="+musicLinkedList.length);
        updateSongList(musicLinkedList, currentSongId);
        var music = document.getElementById('music');
        var music_btn = document.getElementById('music-btn');
        // music.src = musicList[num];
        music.src = currentNode.prev.music;
        currentNode = currentNode.prev;
        turnPlayFromPause(music, music_btn);
    }//切上一首歌
    function nextmusic() {
        currentSongId = (currentSongId + 1) % musicLinkedList.length;
        console.log("curr="+currentSongId.toString()+";len="+musicLinkedList.length);
        updateSongList(musicLinkedList, currentSongId);
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
