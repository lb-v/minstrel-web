import {Component, Output, EventEmitter, OnInit} from '@angular/core';

import {MasterPlayerService} from '../master-player.service';

@Component({
    selector: 'seekbar',
    template: `
        <input type="range"
         [(ngModel)]="displayedValue" 
         (mousedown)="pressSeekbar()" 
         (mouseup)="releaseSeekbar()">
    `,
    outputs: ['valueChange']
})

export class SeekbarComponent implements OnInit {
    public valueChange = new EventEmitter();

    private displayedValue: number = 0;
    private isEdditing = false;

    constructor(private masterPlayerService: MasterPlayerService) {}

    ngOnInit() {
        this.scheduleUpdatePosition();
    }

    scheduleUpdatePosition() {
        setTimeout(() => {this.updatePosition();}, 500);
    }

    updatePosition() {
        if (this.isEdditing) {
            this.scheduleUpdatePosition();
            this.displayedValue = 0;
            return;
        }
        let milliseconds = this.masterPlayerService.currentTimeMilliseconds();
        if (milliseconds == 0) {
            this.displayedValue = 0;
        } else {
            this.displayedValue = this.millisecondsToPosition(milliseconds);
        }
        this.scheduleUpdatePosition();
    }

    pressSeekbar() {
        this.isEdditing = true;
    }

    releaseSeekbar() {
        let milliseconds = this.millisecondsToPosition(this.displayedValue);

        this.valueChange.emit({
            value: milliseconds
        });
        this.isEdditing = false;
    }
    
    positionToMilliseconds(position: number) {
        let duration = this.masterPlayerService.durationMilliseconds();
        return (position * duration) / 100;
    }
    millisecondsToPosition(milliseconds: number) {
        let duration = this.masterPlayerService.durationMilliseconds();
        return (milliseconds * 100) / duration;
    }
}