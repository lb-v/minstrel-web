export declare abstract class Player {
    abstract load(id: string);
    abstract play();
    abstract pause();
    abstract seekTo(millisecond: Number);
}
