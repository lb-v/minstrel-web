import {Component} from '@angular/core';
import {Track} from './track';
import {TrackDetailComponent} from './track-detail.component'

@Component({
  selector: 'search',
  templateUrl: 'html/search.component.html',
  directives: [TrackDetailComponent]
})

export class SearchComponent {
    public keyword = "";
    public displayedTracks: Track[] = [];

    search() {
        this.displayedTracks = this.getTrackList(this.keyword);
    }

    // TODO: to be removed
    getTrackList(keyword) {
        let tracks: Track[] = [{
            id: {
                id: 0,
                source: "youtube"
            },
            title: "track1",
            duration: {
                millisecond: 1
            },
            thumbnail: "http://placekitten.com/80/60",
            date: new Date()
        },
        {
            id: {
                id: 1,
                source: "youtube"
            },
            title: "track2",
            duration: {
                millisecond: 1
            },
            thumbnail: "http://placekitten.com/80/60",
            date: new Date()
        },
        {
            id: {
                id: 2,
                source: "youtube"
            },
            title: "track3",
            duration: {
                millisecond: 1
            },
            thumbnail: "http://placekitten.com/80/60",
            date: new Date()
        }
        ];
        return tracks;
    }
}
