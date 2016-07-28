import {Playlist} from './playlist';
import {Track} from './track';

// PlaylistManager manages a playlist. 
// It keeps the current index and ease the use of the playlist object
export class PlaylistManager extends Playlist {
    public currentIndex = 0;

    initFromPlaylist(playlist: Playlist) {
        this.tracks = playlist.tracks;
        this.currentIndex = 0;
    }
    
    cueToPosition(track: Track, position: Position) {
        switch (position) {
            case Position.First: 
                this.cue(track, 0);
                break;
            case Position.Current:
                this.cue(track, this.currentIndex);
                break;

            case Position.Next:
                if (this.currentIndex + 1 > this.length()) {
                    this.cueToPosition(track, Position.Last);
                    return;
                }
                this.cue(track, this.currentIndex + 1);
                break;

            case Position.Last:
                this.cue(track, Math.max(this.length(), 0));
                break;
        }
    }

    currentTrack() {
        return this.at(this.currentIndex);
    }
}

export enum Position {
    First = 0,
    Current = 1,
    Next = 2,
    Last = 3
}
