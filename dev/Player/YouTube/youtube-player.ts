/// <reference path="../../../typings/globals/youtube/index.d.ts" />
import {window} from '@angular/platform-browser/src/facade/browser';

import {Player} from "../player.ts";

export class YouTubePlayer implements Player {
    private player: YT.Player = null;

    private kDefaultHeight = '195';
    private kDefaultWidth = '320';

    private state: YouTubePlayerState = 0;

    init(elementId: string) {
        this.player = new window.YT.Player(elementId, {
            height: this.kDefaultHeight,
            width: this.kDefaultWidth,
            videoId: ''
        });
        this.player.addEventListener("onStateChange", this.onStateChange)
    }
    load(id: string) {
        if (this.player == null) {
            console.log("YouTube player isn't initialized");
            return;
        }
        this.player.loadVideoById(id);
    }
    play() {
        this.player.playVideo();
    }
    pause() {
        this.player.pauseVideo();
    }
    seekTo(millisecond: number) {
        this.player.seekTo(millisecond / 1000);
    }
    currentTimeMilliseconds() : number {
        return this.player.getCurrentTime() * 1000;
    }

    onStateChange(event: YT.EventArgs) {
        console.log(event);
    }
}

enum YouTubePlayerState {
    Unstarted = -1,
    Stopped = 0,
    Playing = 1
    Paused = 2,
    Buffering = 3,
    Cued = 5
}