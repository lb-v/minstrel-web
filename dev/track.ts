export class Track {
  id: TrackId;
  duration: Duration;
  title: string;
  thumbnail: Thumbnail;
  date: Date;
}

export class TrackId {
  id: string;
  source: string;
}

class Duration {
  millisecond: number;
}

class Thumbnail {
  default: string;
  high: string;
}
