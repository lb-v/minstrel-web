import {PlayerFactory} from "./Player/player.factory";

export class Track {
  public id: TrackId;
  public duration: Duration;
  public title: string;
  public thumbnail: Thumbnail;
  public date: Date;
  private factory: PlayerFactory = null;

  constructor(id: TrackId, 
              title: string, 
              duration: Duration, 
              thumbnail: Thumbnail, 
              date: Date) {
    this.id = id;
    this.duration = duration;
    this.title = title;
    this.thumbnail = thumbnail;
    this.date = date;  
  }

  init(playerFactory: PlayerFactory) {
    this.factory = playerFactory
  }

  private getPlayer() {
    return this.factory.get(this.id.source);
  }

  load() {
    this.getPlayer().load(this.id.id);
  }
  play() {
    // TODO: if loaded
    this.getPlayer().play();
  }
  pause() {
    // TODO: if loaded
    this.getPlayer().pause();
  }
  seekTo(millisecond: number) {
    // TODO: if loaded
    this.getPlayer().seekTo(millisecond);
  }
  currentTimeMilliseconds() : number {
    // TODO: if loaded
    return this.getPlayer().currentTimeMilliseconds();
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
