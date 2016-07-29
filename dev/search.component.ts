import {Component} from '@angular/core';
import {Track, TrackId, TrackIdList} from './track';
import {TrackDetailComponent} from './track-detail.component'
import {SearchService} from './search.service';

import {Position} from './playlist-manager';
import {PlaylistService} from './playlist.service';

@Component({
  selector: 'search',
  templateUrl: 'html/search.component.html',
  directives: [TrackDetailComponent],
  providers: [SearchService]
})

export class SearchComponent {
    public keyword = "";
    public displayedTracks: Track[] = [];
    public errorMessage = "";

    private lastSearchKeyword = "";
    private nextPageToken = "";

    constructor (private searchService: SearchService, 
                 private playlistService: PlaylistService) {}

    search() {
        this.lastSearchKeyword = this.keyword;
        var observable = this.searchService.getTrackIds(this.keyword);
        observable.subscribe(
            (trackIdList: TrackIdList) => {
                this.nextPageToken = trackIdList.NextPageToken;
                this.setTrackIds(trackIdList.IDs);
            }
        );
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

    setTrackIds(trackIds: TrackId[]) {
        this.displayedTracks = [];
        this.addTrackIds(trackIds);
    }

    addTrackIds(trackIds: TrackId[]) {
        for (var index = 0; index < trackIds.length; index++) {
            var trackObs = this.searchService.getTrack(trackIds[index]);
            trackObs.subscribe(
                (track: Track) => {
                    if (track == null) {
                        return;
                    }
                    this.displayedTracks.push(track);
                }
            );
        }
    }

    cueToPlaylist(track: Track) {
        this.playlistService.manager.cueToPosition(track, Position.Next);
    }
}
