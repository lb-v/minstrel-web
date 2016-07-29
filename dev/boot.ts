import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app.component";

import {HTTP_PROVIDERS} from '@angular/http';
import {PlaylistService} from "./playlist.service";

bootstrap(AppComponent, 
          [ 
            HTTP_PROVIDERS, 
            provide(PlaylistService, {useValue: new PlaylistService()}) 
          ]);