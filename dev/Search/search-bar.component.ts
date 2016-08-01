import {Component} from '@angular/core';

import {TrackIdList} from '../track';
import {SearchService} from './search.service';

@Component({
  selector: 'search-bar',
  template: `
    <input type="search"  [(ngModel)]='keyword' placeholder="Search"/>
    <button class="glyphicon glyphicon-search" (click)="search()"></button>
  `
})

export class SearchBarComponent {
  public keyword = "";
  constructor (private searchService: SearchService) {}

  search() {
    this.searchService.search(this.keyword);
    var observable = this.searchService.getTrackIds(this.keyword);
    observable.subscribe(
      (trackIdList: TrackIdList) => {
        for (var index = 0; index < trackIdList.IDs.length; index++) {
          this.searchService.getTrack(trackIdList.IDs[index]);
        }
      }
    );
  }
}