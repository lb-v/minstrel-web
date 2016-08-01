/// <reference path="../../../typings/globals/youtube/index.d.ts" />
import {Component, OnInit} from '@angular/core';
import {window} from '@angular/platform-browser/src/facade/browser';

import {YouTubePlayer} from './youtube-player';

@Component({
    selector: 'youtube-player',
    template: ` 
        <div id="player" style="pointer-events: none"></div>
    `
})

export class YouTubePlayerComponent implements OnInit {
    constructor(private youtubePlayer: YouTubePlayer) {} 

    ngOnInit() {
        this.setupPlayer();
    }

    setupPlayer() {
        window['onYouTubeIframeAPIReady'] = () => {
            this.youtubePlayer.init("player");
        }
        if (window.YT && window.YT.Player) {
            this.youtubePlayer.init("player");
        }
    }
}
