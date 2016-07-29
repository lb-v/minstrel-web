import {Player} from "./player.ts";

import {YouTubePlayer} from "./YouTube/youtube-player"

export class PlayerFactory {
    private players: Player[] = [];
    private services: string[] = [];

    // TODO: shouldn't be here. Register should be done from each player
    // idea: in boot.ts, provide the PlayerFactory with the pre registered players
    constructor() {
        this.register(new YouTubePlayer(), "YouTube");
    }

    register(player: Player, service: string) {
        this.players.push(player);
        this.services.push(service);
    }

    get(service: string) {
        for (var index = 0; index < this.services.length; index++) {
            if (this.services[index] == service) {
                return this.players[index];
            }
        }
        return null;
    }
}