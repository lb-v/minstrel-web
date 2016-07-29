import {Component} from '@angular/core';

import {SearchComponent} from './search.component';
import {CurrentPlaylistComponent} from './Playlist/current-playlist.component';
import {MasterPlayerComponent} from './Player/master-player.component';
import {YouTubePlayerComponent} from './Player/YouTube/youtube-player.component';

import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    directives: [
        SearchComponent,
        CurrentPlaylistComponent,
        MasterPlayerComponent,
        YouTubePlayerComponent
    ]
})

export class AppComponent {
}
