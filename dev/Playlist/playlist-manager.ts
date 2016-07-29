import {Playlist} from './playlist';
import {PlaylistEventListener} from './playlist-event-listener';
import {Track} from '../track';

// PlaylistManager manages a playlist. 
// It keeps the current index and ease the use of the playlist object
export class PlaylistManager extends Playlist {
    private currentIndex_: number = 0;
    private eventListener: PlaylistEventListener = null;

    initFromPlaylist(playlist: Playlist) {
        this.tracks = playlist.tracks;
        this.currentIndex_ = 0;
    }

    currentIndex() {
        return this.currentIndex_;
    }

    setCurrentIndex(index: number) {
        this.currentIndex_ = index;
        if (this.eventListener == null) {
            return;
        }
        this.eventListener.onCurrentTrackChanged();
    }

    setEventListener(eventListener: PlaylistEventListener) {
        this.eventListener = eventListener;
    }
    
    cueToPosition(track: Track, position: Position) {
        switch (position) {
            case Position.First: 
                this.cue(track, 0);
                break;
            case Position.Current:
                this.cue(track, this.currentIndex_);
                // call event listener if any
                if (this.eventListener == null) {
                    return;
                }
                this.eventListener.onCurrentTrackChanged();
                break;

            case Position.Next:
                if (this.currentIndex_ + 1 > this.length()) {
                    this.cueToPosition(track, Position.Last);
                    return;
                }
                this.cue(track, this.currentIndex_ + 1);
                break;

            case Position.Last:
                this.cue(track, Math.max(this.length(), 0));
                break;
        }
    }

    currentTrack() {
        return this.at(this.currentIndex_);
    }
}

export enum Position {
    First = 0,
    Current = 1,
    Next = 2,
    Last = 3
}
