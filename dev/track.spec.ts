import { Track } from './track.ts'

describe('Track', () => {
  var track: Track = {
    id: {
      id: 0,
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
