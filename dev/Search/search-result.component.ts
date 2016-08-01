import {Component} from '@angular/core';
import {window, document} from '@angular/platform-browser/src/facade/browser';

import {Track, TrackId, TrackIdList} from '../track';
import {TrackDetailComponent} from '../track-detail.component'
import {SearchService, SearchEventListener} from './search.service';

import {Position} from '../Playlist/playlist-manager';
import {PlaylistService} from '../Playlist/playlist.service';
import {PlayerFactory} from '../Player/player.factory';

@Component({
  selector: 'search-result',
  templateUrl: 'html/search-result.component.html',
  directives: [TrackDetailComponent]
})

export class SearchResultComponent implements SearchEventListener {
    public displayedTracks: Track[] = [];
    public errorMessage = "";

    private lastSearchKeyword = "";
    private nextPageToken = "";
    
    private lastLoadHeight = 0;

    constructor (private searchService: SearchService, 
                 private playlistService: PlaylistService,
                 private playerFactory: PlayerFactory) {
                     searchService.setEventListener(this);
                 }

    // onScroll handles the scroll event to allow infinite scroll through results
    onScroll() {
        // if the window still has the same height as last loadNextPage call, do nothing
        if (this.lastLoadHeight == document.body.offsetHeight) {
            return;
        }
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.lastLoadHeight = document.body.offsetHeight;
            this.loadNextPage();
        }
    }

    loadNextPage() {
        var observable = this.searchService.getNextTrackIds(this.lastSearchKeyword, 
                                                            this.nextPageToken);
        observable.subscribe(
            (trackIdList: TrackIdList) => {
                this.nextPageToken = trackIdList.NextPageToken;
                this.addTrackIds(trackIdList.IDs);
            }
        );
    }

    addTrackIds(trackIds: TrackId[]) {
        var trackObs = this.searchService.getTracks(trackIds);
        trackObs.subscribe(
            (tracks: Track[]) => {
                this.onTracksFound(tracks);
            }
        );
    }

    cueToPlaylist(track: Track) {
        this.playlistService.manager.cueToPosition(track, Position.Next);
    }

    // search event listener
    onNewQueryStarted(keyword: string) {
        this.lastSearchKeyword = keyword;
        this.displayedTracks = [];
    }

    onNextPageTokenChanged(nextPageToken: string) {
        this.nextPageToken = nextPageToken;
    }

    onTracksFound(tracks: Track[]) {
        if (tracks == null) {
            return;
        }
        for (var index=0; index<tracks.length; index++) {
            tracks[index].init(this.playerFactory);
            this.displayedTracks.push(tracks[index]);
        }
        // make sure we load enough data to fill the page 
        this.onScroll();
    }
}
