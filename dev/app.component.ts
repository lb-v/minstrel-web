import {Component} from '@angular/core';

import {SearchResultComponent} from './Search/search-result.component';
import {SearchBarComponent} from './Search/search-bar.component';
import {CurrentPlaylistComponent} from './Playlist/current-playlist.component';
import {MasterPlayerComponent} from './Player/master-player.component';
import {YouTubePlayerComponent} from './Player/YouTube/youtube-player.component';

import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    directives: [
        SearchResultComponent,
        SearchBarComponent,
        CurrentPlaylistComponent,
        MasterPlayerComponent,
        YouTubePlayerComponent
    ]
})

export class AppComponent {
}
