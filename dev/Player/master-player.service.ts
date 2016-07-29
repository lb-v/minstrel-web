import {PlaylistManager} from '../Playlist/playlist-manager';
import {PlaylistEventListener} from '../Playlist/playlist-event-listener';

export class MasterPlayerService implements PlaylistEventListener {
    constructor(private playlist: PlaylistManager) {
        playlist.setEventListener(this);
    }

    onCurrentTrackChanged() {
        console.log("Current track changed !!");
    }

    play() {

    }

    pause() {

    }

    next() {

    }

    previous() {

    }

    seekTo(millisecond: Number) {

    }
}
