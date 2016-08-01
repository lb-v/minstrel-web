import {PlaylistManager} from '../Playlist/playlist-manager';
import {PlaylistEventListener} from '../Playlist/playlist-event-listener';
import {PlayerEventListener} from './player';

export enum Status {
    Paused = 0,
    Playing = 1
}

export class MasterPlayerService implements PlaylistEventListener,
                                            PlayerEventListener {
    private status_: Status = Status.Paused;                                        

    constructor(private playlist: PlaylistManager) {
        playlist.setEventListener(this);
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

    seekTo(millisecond: number) {
        if (this.playlist.length() == 0) {
            return;
        }
        this.playlist.currentTrack().seekTo(millisecond);
    }

    next() {
        if (!this.playlist.hasNext()) {
            return;
        }
        this.playlist.setCurrentIndex(this.playlist.currentIndex() + 1);
    }

    previous() {
        if (!this.playlist.hasPrevious()) {
            return;
        }
        this.playlist.setCurrentIndex(this.playlist.currentIndex() - 1);
    }

    currentTimeMilliseconds() : number {
        if (this.playlist.length() == 0) {
            return 0;
        }
        return this.playlist.currentTrack().currentTimeMilliseconds();
    }

    durationMilliseconds() {
        if (this.playlist.length() == 0) {
            return 0;
        }
        return this.playlist.currentTrack().duration.millisecond;
    }

    status() {
        return this.status_;
    }

    // playlist event listener
    onCurrentTrackChanged() {
        // TODO: if is playing
        this.playlist.currentTrack().load();
    }

    // player event listener
    onPlaying() {
        this.status_ = Status.Playing;
    }
    onPaused() {
        this.status_ = Status.Paused;
    }
    onStopped() {
        if (!this.playlist.hasNext()) {
            this.status_ = Status.Paused;
            return;
        }
        this.next();
        this.play();
    }
}
