import {Component} from '@angular/core';

import {PlaylistManager} from './playlist-manager';
import {PlaylistModel} from './playlist.model';

@Component({
  selector: 'current-playlist',
  templateUrl: 'html/current-playlist.component.html'
})

export class CurrentPlaylistComponent {
    constructor (private playlistModel: PlaylistModel) {}
}