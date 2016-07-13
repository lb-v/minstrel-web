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
    public displayedTrackIDs: TrackId[] = [];
    public displayedTracks: Track[] = [];
    public errorMessage = "";

    constructor (private searchService: SearchService) {}

    search() {
        var observable = this.searchService.getTracks(this.keyword);
        observable.subscribe(
            tracks => this.displayedTrackIDs = tracks,
            error => this.errorMessage = <any>error);
    }
}
