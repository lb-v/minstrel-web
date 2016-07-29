import {
    describe, 
    expect, 
    beforeEach,
    it} from '@angular/core/testing';

import { PlaylistManager, Position } from './playlist-manager'
import { Track } from '../track'

export function main() {
  describe('Playlist Manager', () => {
    let playlistManager: PlaylistManager;
    var trackOne: Track;
    var trackTwo: Track;
    var trackThree: Track;
    
    beforeEach(() => {
        playlistManager = new PlaylistManager();
        
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

    it('cue tracks', () => {
        // default is queue next
        playlistManager.cueToPosition(trackOne, Position.Next);
        expect(playlistManager.length()).toEqual(1);
        expect(playlistManager.currentTrack().title).toEqual("trackOne");

        // queue next again
        playlistManager.cueToPosition(trackTwo, Position.Next);
        expect(playlistManager.length()).toEqual(2);
        // shouldn't change current track
        expect(playlistManager.currentIndex()).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackOne");
        // but next is changed
        expect(playlistManager.at(playlistManager.currentIndex() + 1).title).toEqual("trackTwo");

        // queue next again
        playlistManager.cueToPosition(trackThree, Position.Next);
        expect(playlistManager.length()).toEqual(3);
        // shouldn't change current track
        expect(playlistManager.currentIndex()).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackOne");
        // but next is changed
        expect(playlistManager.at(playlistManager.currentIndex() + 1).title).toEqual("trackThree");

        // queue current index
        playlistManager.cueToPosition(trackThree, Position.Current);
        expect(playlistManager.length()).toEqual(4);
        expect(playlistManager.currentIndex()).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackThree");
        expect(playlistManager.at(1).title).toEqual("trackOne");

        // change current index
        playlistManager.setCurrentIndex(3);
        expect(playlistManager.currentIndex()).toEqual(3);
        expect(playlistManager.at(0).title).toEqual("trackThree");
        expect(playlistManager.at(1).title).toEqual("trackOne");
        expect(playlistManager.at(2).title).toEqual("trackThree");
        expect(playlistManager.at(3).title).toEqual("trackTwo");
        expect(playlistManager.currentTrack().title).toEqual("trackTwo");
    });
  });
}
