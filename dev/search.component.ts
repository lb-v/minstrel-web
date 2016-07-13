import {Component} from '@angular/core';
import {Track} from './track';
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

    constructor (private searchService: SearchService) {}

    search() {
        this.displayedTracks = this.searchService.getTracks(this.keyword);
    }
}
