import {Component} from '@angular/core';
import {MasterPlayerService} from './master-player.service';

@Component({
    selector: 'master-player',
    template: `
        <button (click)="play()">Play</button>
        <button (click)="pause()">Pause</button>
    `
})

export class MasterPlayerComponent {
    constructor(private masterPlayerService: MasterPlayerService) {}
    play() {
        this.masterPlayerService.play();
    }
    pause() {
        this.masterPlayerService.pause();
    }
}