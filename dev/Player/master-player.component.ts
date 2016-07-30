import {Component} from '@angular/core';
import {MasterPlayerService} from './master-player.service';
import {SeekbarComponent} from './utils/seekbar.component';

@Component({
    selector: 'master-player',
    template: `
        <button (click)="play()">Play</button>
        <button (click)="pause()">Pause</button>
        <seekbar (valueChange)="seekValueChange($event);"></seekbar>
        {{seekValue}}
    `,
    directives: [SeekbarComponent]
})

export class MasterPlayerComponent {
    constructor(private masterPlayerService: MasterPlayerService) {

    }

    seekValueChange(event) {
        let milliseconds = event.value;
        this.masterPlayerService.seekTo(milliseconds);
    }

    play() {
        this.masterPlayerService.play();
    }

    pause() {
        this.masterPlayerService.pause();
    }
}