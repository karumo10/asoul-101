(function () {
    const vscode = acquireVsCodeApi();
    function turnPlayFromPause(music, playButton, pauseButton) {
        var promise = music.play();
        if (promise !== undefined) {
            promise.then(_ => {
                // music_btn.src=pauseUri;
                playButton.style.display = "none";
                pauseButton.style.display = "inline";
            }).catch(err => {
                console.log(err);
            });
        }
    }
    function turnPauseFromPlay(music, playButton, pauseButton) {
        music.pause();
        console.log("haha");
        playButton.style.display = "inline";
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
            this.head = new MusicListNode("", "这里还什么都没有哦~"); // dummy node
            this.head.next = this.head;
            this.head.prev = this.head;
            this.length = 0;
        }
        addMusic(music, name, playingNode) { // add at second place
            this.length = this.length + 1; // 歌曲列表增长1
            var currNode = new MusicListNode(music, name);
            currNode.prev = null;
            currNode.next = null;
            if (this.length == 1) {
                let currentPlayingMusic = document.getElementById('music'); 
                console.log('第一次');
                currentPlayingMusic.src = music; // 上一次最后一首歌被删除，强行将资源赋给当前的音乐资源
            }
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
        deleteMusic(index) { // 删除 index 处的节点
            if (this.length == 0) {
                return;
            }
            if (currentSongId == index) {
                // 删除正在播放的歌曲
                if (this.length == 1) {
                    var music = document.getElementById('music'); 
                    // 删除的还是唯一一首歌
                    this.head = new MusicListNode("", "这里还什么都没有哦~");
                    currentNode = this.head;
                    this.head.next = this.head;
                    this.head.prev = this.head;
                    music.src = ''; // 没歌了
                    this.length = 0;
                    updateSongList(this, currentSongId);
                    return;
                }
                var music = document.getElementById('music'); 
                music.src = currentNode.next.music;
                // 切到下一首，不然会卡死
            }
            var currNode = this.head;
            for (let i = 0; i < index; i++) {
                currNode = currNode.next;
            }
            if (currNode.next == currNode) {
                // only head
                console.log('only head del, rplce');
                currNode.music = "";
                currNode.name = "这里还什么都没有哦~";
                this.head = currNode;
            } else {
                console.log('not only head del');
                currNode.prev.next = currNode.next;
                currNode.next.prev = currNode.prev;
                if (currNode == this.head) {
                    this.head = currNode.next;
                }
            }
            this.length--;
            console.log("删除歌曲"+currNode.name);
            if (currentSongId != index) {
                if (currentSongId > index) {
                    currentSongId--;
                    // currentSongId 上移一格
                }
                updateSongList(this, currentSongId); 
            } else { // 删除的就是当前这首，加粗的id不能再是currentID了
                // 当前 currentSongId 就是下一首该播的 indexz
                console.log("curr="+currentSongId.toString()+";len="+musicLinkedList.length);
                currentNode = currentNode.next;
                updateSongList(this, currentSongId); 
            }

        }
    }
    var musicLinkedList = new MusicLinkedList();
    var currentNode = musicLinkedList.head; // 当前正在播放的歌曲在链表中的节点
    var currentSongId = 0; // 当前正在播放的歌曲的<li> id

    // window.setInterval(updateSongList, 50, musicLinkedList, currentSongId);

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
        if (musicLinkedList.length == 0) {
            return;
        }
        while (1) {
            // 遍历链表，生成一个新的歌单元素
            console.log("我卡了，啊");
            var songDiv = document.createElement("div");
            songDiv.setAttribute('class', 'songItem');
            songDiv.setAttribute('id', 'div'+index.toString());

            var currentSongLi = document.createElement("li");
            currentSongLi.append(document.createTextNode(curr.name));
            currentSongLi.setAttribute('id', index.toString()); // set id
            currentSongLi.setAttribute('class', 'songText');
            songDiv.appendChild(currentSongLi);

            var deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'del');
            deleteButton.setAttribute('id', 'del'+index.toString());
            // deleteButton.innerText = "x";
            songDiv.appendChild(deleteButton);

            if (index == currId) {
                // 对当前正在播放的歌曲加粗
                currentSongLi.style.fontWeight="bolder";
            }
            list.appendChild(songDiv);
            curr = curr.next;
            index = index + 1;
            if (curr == musicLinkedList.head) {
                break;
            }
        }
        // currentSong.appendChild(document.createTextNode(musicName));
        // list.appendChild(currentSong);

        // 更新delete按钮的绑定
        Array.from(document.getElementsByClassName('del')).forEach((del) => {
            del.addEventListener('click', () => {
                let id = del.getAttribute('id').match(/\d+/); // 获取 id
                console.log("del id="+id.toString());
                musicLinkedList.deleteMusic(id);
            });
        });
    }
    // var num = 0;
    // var n = musicList.length;//获取数组的长度
    function lastmusic() {
        currentSongId = (currentSongId - 1 + musicLinkedList.length) % musicLinkedList.length;
        console.log("curr="+currentSongId.toString()+";len="+musicLinkedList.length);
        updateSongList(musicLinkedList, currentSongId);
        var music = document.getElementById('music');
        var musicPlayButton = document.getElementById('play');
        var musicPauseButton = document.getElementById('pause');
        // music.src = musicList[num];
        music.src = currentNode.prev.music;
        currentNode = currentNode.prev;
        turnPlayFromPause(music, musicPlayButton, musicPauseButton);
    }//切上一首歌
    function nextmusic() {
        currentSongId = (currentSongId + 1) % musicLinkedList.length;
        console.log("curr="+currentSongId.toString()+";len="+musicLinkedList.length);
        updateSongList(musicLinkedList, currentSongId);
        var music = document.getElementById('music');
        var musicPlayButton = document.getElementById('play');
        var musicPauseButton = document.getElementById('pause');
        music.src = currentNode.next.music;
        currentNode = currentNode.next;
        // music.src = musicList[num];
        turnPlayFromPause(music, musicPlayButton, musicPauseButton);
    }//切下一首歌
    window.onload=function () {
        music.addEventListener('ended', function () {
            nextmusic();
        },false)
    }//自动连播功能，监听播放情况，结束之后就调用下一首歌的函数
    document.getElementById('play').addEventListener('click', () => {
        playPause();
        console.log(Array.from(document.getElementsByClassName('del')));
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
