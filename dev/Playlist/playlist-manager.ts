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
        var cuePosition = 0;
        switch (position) {
            case Position.First: 
                cuePosition = 0;
                break;
            case Position.Current: 
                cuePosition = this.currentIndex_;
                break;

            case Position.Next:
                if (this.currentIndex_ + 1 > this.length()) {
                    this.cueToPosition(track, Position.Last);
                    return;
                }
                cuePosition = this.currentIndex_ + 1;
                break;

            case Position.Last:
                cuePosition = Math.max(this.length(), 0);
                break;
        }
        this.cue(track, cuePosition);
        
        // call event listener and cuePosition is the current one
        if (this.eventListener == null || 
            cuePosition != this.currentIndex_) {
            return;
        }
        this.eventListener.onCurrentTrackChanged();
    }

    currentTrack() {
        return this.at(this.currentIndex_);
    }

    hasNext() {
        return (this.currentIndex() + 1) < this.length();
    }
    hasPrevious() {
        return (this.currentIndex() - 1) > 0;
    }
}

export enum Position {
    First = 0,
    Current = 1,
    Next = 2,
    Last = 3
}
