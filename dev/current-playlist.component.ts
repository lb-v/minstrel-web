import {Component} from '@angular/core';

import {PlaylistManager} from './playlist-manager';
import {PlaylistService} from './playlist.service';
import {TrackDetailComponent} from './track-detail.component'

@Component({
  selector: 'current-playlist',
  templateUrl: 'html/current-playlist.component.html',
  directives: [TrackDetailComponent]
})

export class CurrentPlaylistComponent {
    constructor (private playlistService: PlaylistService) {}

    selectedTrackIndex(index: number) {
      this.playlistService.manager.currentIndex = index;
    }
}