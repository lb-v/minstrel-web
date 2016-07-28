import {Component} from '@angular/core';

import {PlaylistManager} from './playlist-manager';
import {PlaylistModel} from './playlist.model';
import {TrackDetailComponent} from './track-detail.component'

@Component({
  selector: 'current-playlist',
  templateUrl: 'html/current-playlist.component.html',
  directives: [TrackDetailComponent]
})

export class CurrentPlaylistComponent {
    constructor (private playlistModel: PlaylistModel) {}

    selectedTrackIndex(index: number) {
      this.playlistModel.manager.currentIndex = index;
    }
}