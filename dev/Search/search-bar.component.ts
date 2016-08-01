import {Component} from '@angular/core';

import {TrackIdList} from '../track';
import {SearchService} from './search.service';

@Component({
  selector: 'search-bar',
  template: `
    <input type="search"  [(ngModel)]='keyword' placeholder="Search" (keydown)="search($event)"/>
  `
})

export class SearchBarComponent {
  public keyword = "";
  constructor (private searchService: SearchService) {}

  search(event: KeyboardEvent) {
    // check if key is enter
    if(event.keyCode != 13 || this.keyword == "") {
      return;
    }
    this.searchService.search(this.keyword);
    var observable = this.searchService.getTrackIds(this.keyword);
    observable.subscribe(
      (trackIdList: TrackIdList) => {
        this.searchService.getTracks(trackIdList.IDs);
      }
    );
  }
}