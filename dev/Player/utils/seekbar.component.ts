import {Component, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {document} from '@angular/platform-browser/src/facade/browser';

import {MasterPlayerService} from '../master-player.service';

@Component({
    selector: 'seekbar',
    template: `
        <progress id="range" class="seekbar" 
         value="{{displayedValue}}" 
         max="100" 
         (mousedown)="releaseSeekbar($event)"
         ></progress>
    `,
    outputs: ['valueChange']
})

export class SeekbarComponent implements OnInit {
    public valueChange = new EventEmitter();

    private displayedValue: number = 0;
    private range: ElementRef;

    constructor(private masterPlayerService: MasterPlayerService) {}

    ngOnInit() {
        this.scheduleUpdatePosition();
        this.range = new ElementRef(document.getElementById("range"));
        console.log(this.range);
    }

    scheduleUpdatePosition() {
        setTimeout(() => {this.updatePosition();}, 500);
    }

    updatePosition() {
        let milliseconds = this.masterPlayerService.currentTimeMilliseconds();
        if (milliseconds == 0) {
            this.displayedValue = 0;
        } else {
            this.displayedValue = this.millisecondsToPosition(milliseconds);
        }
        this.scheduleUpdatePosition();
    }

    releaseSeekbar(event) {
        var x = event.pageX - this.range.nativeElement.offsetLeft;
        var width = this.range.nativeElement.offsetWidth;
        var value = (x * 100) / width;

        let milliseconds = this.positionToMilliseconds(value);

        this.valueChange.emit({
            value: milliseconds
        });
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