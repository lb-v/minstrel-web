import {PlayerFactory} from "./Player/player.factory";

export class Track {
  public id: TrackId;
  public duration: Duration;
  public title: string;
  public thumbnail: Thumbnail;
  public date: Date;
  private factory: PlayerFactory;

  constructor(playerFactory: PlayerFactory,
              id: TrackId, 
              title: string, 
              duration: Duration, 
              thumbnail: Thumbnail, 
              date: Date) {
    this.factory = playerFactory;
    this.id = id;
    this.duration = duration;
    this.title = title;
    this.thumbnail = thumbnail;
    this.date = date;  
  }

  load() {
    
  }
  play() {

  }
  pause() {
    
  }
  seekTo(millisecond: Number) {

  }
}

export class TrackId {
  id: string;
  source: string;
}

export class TrackIdList {
  IDs: TrackId[];
  NextPageToken: string;
}

class Duration {
  millisecond: number;
}

class Thumbnail {
  default: string;
  high: string;
}
