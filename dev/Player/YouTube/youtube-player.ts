import {Player} from "../player.ts";

export class YouTubePlayer implements Player {
    load(id: string) {
        console.log("YouTube load " + id);
    }
    play() {
        console.log("YouTube play");
    }
    pause() {
        console.log("YouTube pause");
    }
    seekTo(millisecond: Number) {
        console.log("YouTube seek");
    }
}