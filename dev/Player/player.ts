export declare abstract class Player {
    abstract load(id: string);
    abstract play();
    abstract pause();
    abstract seekTo(millisecond: number);
    abstract currentTimeMilliseconds() : number;
    abstract setPlayerEventListener(eventListener: PlayerEventListener);
}

export declare abstract class PlayerEventListener {
    abstract onPlaying();
    abstract onPaused();
    abstract onStopped();
}
