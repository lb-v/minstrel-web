import {Track} from './track';

// Playlist represent a list of tracks. It doesn't represent the current playlist. 
// That means that it doesn't integrate a current index and you can't cue a song on 
// a current or next position since it doesn't make sense
export class Playlist {
    tracks: Track[];

    constructor() {
        this.tracks = [];
    }

    // throws if position isn't correct
    cue(track: Track, position: number) {
        this.tracks.splice(position, 0, track);
    }

    at(index: number) {
        return this.tracks[index];
    }
    
    remove(index: number) {
        this.tracks.splice(index, 1);
    }
    
    length() {
        return this.tracks.length;
    }
}

export enum Position {
    First = 0,
    Current = 1,
    Next = 2,
    Last = 3
}