import {Component} from '@angular/core';
import {Track, TrackId} from './track';
import {TrackDetailComponent} from './track-detail.component'
import {SearchService} from './search.service';

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

    constructor (private searchService: SearchService) {}

    search() {
        var observable = this.searchService.getTrackIds(this.keyword);
        observable.subscribe(
            (tracks: TrackId[]) => {
                this.setTrackIds(tracks);
            }
        );
    }

    setTrackIds(trackIds: TrackId[]) {
        this.displayedTracks = [];
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
}
