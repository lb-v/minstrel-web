/// <reference path="../../typings/globals/youtube/index.d.ts" />
import {Component, OnInit} from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';

@Component({
    selector: 'youtube-player',
    template: `
        <h1> the youtube player ! </h1>   
        <div id="player"></div>
    `
})

export class YouTubePlayerComponent implements OnInit {
    private player: YT.Player;

    ngOnInit() {
        this.setupPlayer();
    }

    setupPlayer() {
        window['onYouTubeIframeAPIReady'] = () => {
            this.createPlayer();
        }
        if (window.YT && window.YT.Player) {
            this.createPlayer();
        }
    }

    createPlayer() {
        console.log("Create player !");
        this.player = new window.YT.Player("player", {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE'
        });
    }
}
