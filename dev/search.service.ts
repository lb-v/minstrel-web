import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track} from './track';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor (private http: Http) {}

    private serverUrl = "51.254.143.122:8080/v1/"

    getTracks(keyword: string): Observable<Track[]> {
        /*return this.http.get(this.serverUrl + "TrackIDs?q="+keyword)
                        .map(this.extractIDs)
                        .catch(this.handleError);*/
        let tracks: Track[] = [{
            id: {
                id: 0,
                source: "youtube"
            },
            title: "track1",
            duration: {
                millisecond: 1
            },
            thumbnail: "http://placekitten.com/800/600",
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
            thumbnail: "http://placekitten.com/100/100",
            date: new Date()
        }
        ];
        return tracks;
    }
/*
    private extractIDs(res: Response) {
        let body = res.json();
        return {};
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
       // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
  }*/
}
