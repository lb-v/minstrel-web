/// <reference path="../../../typings/globals/youtube/index.d.ts" />
import {window} from '@angular/platform-browser/src/facade/browser';

import {Player} from "../player.ts";

export class YouTubePlayer implements Player {
    private player: YT.Player = null;

    init(elementId: string) {
        this.player = new window.YT.Player(elementId, {
            height: '390',
            width: '640',
            videoId: ''
        });
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
    seekTo(millisecond: Number) {
        console.log("YouTube seek");
    }
}