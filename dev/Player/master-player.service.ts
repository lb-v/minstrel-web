import {PlaylistManager} from '../Playlist/playlist-manager';
import {PlaylistEventListener} from '../Playlist/playlist-event-listener';

export class MasterPlayerService implements PlaylistEventListener {
    constructor(private playlist: PlaylistManager) {
        playlist.setEventListener(this);
    }

    onCurrentTrackChanged() {
        this.playlist.currentTrack().load();
    }

    play() {
        if (this.playlist.length() == 0) {
            return;
        }
        this.playlist.currentTrack().play();
    }

    pause() {
        if (this.playlist.length() == 0) {
            return;
        }
        this.playlist.currentTrack().pause();
    }

    seekTo(millisecond: Number) {
        if (this.playlist.length() == 0) {
            return;
        }
        this.playlist.currentTrack().seekTo(millisecond);
    }

    next() {

    }

    previous() {

    }

    currentTimeMilliseconds() {
        if (this.playlist.length() == 0) {
            return 0;
        }
        this.playlist.currentTrack().currentTimeMilliseconds();
    }

    durationMilliseconds() {
        if (this.playlist.length() == 0) {
            return 0;
        }
        return this.playlist.currentTrack().duration.millisecond;
    }
}
