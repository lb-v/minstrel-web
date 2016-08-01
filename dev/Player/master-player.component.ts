import {Component} from '@angular/core';
import {MasterPlayerService, Status} from './master-player.service';
import {SeekbarComponent} from './utils/seekbar.component';

@Component({
    selector: 'master-player',
    templateUrl: 'html/master-player.component.html',
    directives: [SeekbarComponent]
})

export class MasterPlayerComponent {
    constructor(private masterPlayerService: MasterPlayerService) {

    }

    seekValueChange(event) {
        let milliseconds = event.value;
        this.masterPlayerService.seekTo(milliseconds);
    }

    isPlaying() {
        return this.masterPlayerService.status() == Status.Playing;
    }

    play() {
        this.masterPlayerService.play();
    }

    pause() {
        this.masterPlayerService.pause();
    }
}