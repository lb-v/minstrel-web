import {Component} from '@angular/core';
import {SearchComponent} from './search.component';
import {CurrentPlaylistComponent} from './current-playlist.component';

import {PlaylistModel} from './playlist.model';

import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    directives: [
        SearchComponent,
        CurrentPlaylistComponent
    ],
    providers: [PlaylistModel]
})

export class AppComponent {
    constructor(private playlistModel: PlaylistModel) {
        console.log("from AppComponent, " playlistModel.test);
    }
}
