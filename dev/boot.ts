import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app.component";

import {HTTP_PROVIDERS} from '@angular/http';
import {PlaylistModel} from "./playlist.model";

bootstrap(AppComponent, 
          [ 
            HTTP_PROVIDERS, 
            provide(PlaylistModel, {useValue: new PlaylistModel()}) 
          ]);