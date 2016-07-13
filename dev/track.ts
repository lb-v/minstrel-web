export class Track {
  id: TrackId;
  duration: Duration;
  title: string;
  thumbnail: string;
  date: Date;
}

class TrackId {
  id: number;
  source: string;
}

class Duration {
  millisecond: number;
}
