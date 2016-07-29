import {
    describe, 
    expect, 
    beforeEach,
    it} from '@angular/core/testing';

import { Playlist } from './playlist'
import { Track } from '../track'

export function main() {
  describe('Playlist', () => {
    let playlist: Playlist;
    var trackOne: Track;
    var trackTwo: Track;
    var trackThree: Track;
    
    beforeEach(() => {
        playlist = new Playlist();
        
        trackOne = new Track(null,
            { id: "1", source: "" },
            "trackOne",
            { millisecond: 0 },
            { default: "", high: "" },
            new Date()
        );
        
        trackTwo = new Track(null,
            { id: "2", source: "" },
            "trackTwo",
            { millisecond: 0 },
            { default: "", high: "" },
            new Date()
        );
        
        trackThree = new Track(null,
            { id: "3", source: "" },
            "trackThree",
            { millisecond: 0 },
            { default: "", high: "" },
            new Date()
        );
    });

    it('cue and remove tracks', () => {
        // add one track
        playlist.cue(trackOne, 0);
        expect(playlist.length()).toEqual(1);
        expect(playlist.at(0).title).toEqual("trackOne");
        // add another one after
        playlist.cue(trackTwo, 1);
        expect(playlist.length()).toEqual(2);
        expect(playlist.at(0).title).toEqual("trackOne");
        expect(playlist.at(1).title).toEqual("trackTwo");
        // add one more in front
        playlist.cue(trackThree, 0);
        expect(playlist.length()).toEqual(3);
        expect(playlist.at(0).title).toEqual("trackThree");
        expect(playlist.at(1).title).toEqual("trackOne");
        expect(playlist.at(2).title).toEqual("trackTwo");
        // and a last one in the middle
        playlist.cue(trackTwo, 1);
        expect(playlist.length()).toEqual(4);
        expect(playlist.at(0).title).toEqual("trackThree");
        expect(playlist.at(1).title).toEqual("trackTwo");
        expect(playlist.at(2).title).toEqual("trackOne");
        expect(playlist.at(3).title).toEqual("trackTwo");

        // remove in front
        playlist.remove(0);
        expect(playlist.length()).toEqual(3);
        expect(playlist.at(0).title).toEqual("trackTwo");
        expect(playlist.at(1).title).toEqual("trackOne");
        expect(playlist.at(2).title).toEqual("trackTwo");
        // remove in the middle
        playlist.remove(1);
        expect(playlist.length()).toEqual(2);
        expect(playlist.at(0).title).toEqual("trackTwo");
        expect(playlist.at(1).title).toEqual("trackTwo");
    });
  });
}
