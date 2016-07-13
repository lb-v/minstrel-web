import {Component, Input} from '@angular/core';
import {Track} from './track';

@Component({
  selector: 'track-detail',
  templateUrl: 'html/track-detail.component.html'
})

export class TrackDetailComponent {
  @Input()
  track: Track;
}
