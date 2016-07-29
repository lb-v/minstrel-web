import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app.component";

import {HTTP_PROVIDERS} from '@angular/http';
import {PlaylistService} from "./Playlist/playlist.service";
import {PlayerFactory} from "./Player/player.factory";
import {MasterPlayerService} from "./Player/master-player.service";

var gPlaylistService = new PlaylistService();

bootstrap(AppComponent, 
          [ 
            HTTP_PROVIDERS, 
            provide(PlaylistService, {useValue: gPlaylistService}) ,
            provide(PlayerFactory, {useValue: new PlayerFactory()}),
            provide(MasterPlayerService, {useValue: new MasterPlayerService(gPlaylistService.manager)})
          ]);