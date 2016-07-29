import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app.component";

import {HTTP_PROVIDERS} from '@angular/http';
import {PlaylistService} from "./playlist.service";
import {PlayerFactory} from "./Player/player.factory";

bootstrap(AppComponent, 
          [ 
            HTTP_PROVIDERS, 
            provide(PlaylistService, {useValue: new PlaylistService()}) ,
            provide(PlayerFactory, {useValue: new PlayerFactory()})
          ]);