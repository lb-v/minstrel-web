import {Component} from '@angular/core';
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

    constructor (private searchService: SearchService, 
                 private playlistService: PlaylistService,
                 private playerFactory: PlayerFactory) {
                     searchService.setEventListener(this);
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
        for (var index = 0; index < trackIds.length; index++) {
            var trackObs = this.searchService.getTrack(trackIds[index]);
            trackObs.subscribe(
                (track: Track) => {
                    if (track == null) {
                        return;
                    }
                    track.init(this.playerFactory);
                    this.displayedTracks.push(track);
                }
            );
        }
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

    onTrackFound(track: Track) {
        this.displayedTracks.push(track);
    }
}
