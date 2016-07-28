import {Injectable} from '@angular/core';

import {PlaylistManager, Position} from './playlist-manager';
import {Track} from './track'

export class PlaylistModel {
    // the current playlist
    public manager = new PlaylistManager();

    // TODO: add saved playlist, retreive playlists from server etc...
}
