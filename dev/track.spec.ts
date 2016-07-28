import {
    describe, 
    expect, 
    it} from '@angular/core/testing';

import { Track, TrackId } from './track.ts'

export function main() {
  describe('Track', () => {
    let track: Track;
    track = {
      id: {
        id: "someTrackId",
        source: "youtube"
      },
      title: "Toto",
      duration: {
        millisecond: 120
      },
      thumbnail: {
        default: "sdfsf",
        high: "none"
      },
      date: new Date()
    }

    it('has title', () => {
      expect(track.title).toEqual("Toto");
    });
  });
}
