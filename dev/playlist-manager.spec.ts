import {
    describe, 
    expect, 
    beforeEach,
    it} from '@angular/core/testing';

import { PlaylistManager, Position } from './playlist-manager'
import { Track } from './track'

export function main() {
  describe('Playlist Manager', () => {
    let playlistManager: PlaylistManager;
    var trackOne: Track;
    var trackTwo: Track;
    var trackThree: Track;
    
    beforeEach(() => {
        playlistManager = new PlaylistManager();
        
        trackOne = {
            id: { id: "1", source: "" },
            title: "trackOne",
            duration: { millisecond: 0 },
            thumbnail: { default: "", high: "" },
            date: new Date()
        };
        
        trackTwo = {
            id: { id: "2", source: "" },
            title: "trackTwo",
            duration: { millisecond: 0 },
            thumbnail: { default: "", high: "" },
            date: new Date()
        };
        
        trackThree = {
            id: { id: "3", source: "" },
            title: "trackThree",
            duration: { millisecond: 0 },
            thumbnail: { default: "", high: "" },
            date: new Date()
        };
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
        expect(playlistManager.currentIndex).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackOne");
        // but next is changed
        expect(playlistManager.at(playlistManager.currentIndex + 1).title).toEqual("trackTwo");

        // queue next again
        playlistManager.cueToPosition(trackThree, Position.Next);
        expect(playlistManager.length()).toEqual(3);
        // shouldn't change current track
        expect(playlistManager.currentIndex).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackOne");
        // but next is changed
        expect(playlistManager.at(playlistManager.currentIndex + 1).title).toEqual("trackThree");

        // queue current index
        playlistManager.cueToPosition(trackThree, Position.Current);
        expect(playlistManager.length()).toEqual(4);
        expect(playlistManager.currentIndex).toEqual(0);
        expect(playlistManager.currentTrack().title).toEqual("trackThree");
        expect(playlistManager.at(1).title).toEqual("trackOne");

        // change current index
        playlistManager.currentIndex = 3;
        expect(playlistManager.currentIndex).toEqual(3);
        expect(playlistManager.at(0).title).toEqual("trackThree");
        expect(playlistManager.at(1).title).toEqual("trackOne");
        expect(playlistManager.at(2).title).toEqual("trackThree");
        expect(playlistManager.at(3).title).toEqual("trackTwo");
        expect(playlistManager.currentTrack().title).toEqual("trackTwo");
    });
  });
}
