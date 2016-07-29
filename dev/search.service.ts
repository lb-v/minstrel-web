import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track, TrackId, TrackIdList} from './track';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor (private http: Http) {
    }

    private serverUrl = 'http://51.254.143.122:8080/v1/'

    getTrackIds(keyword: string): Observable<TrackIdList> {
        return this.http.get(this.serverUrl + "TrackIDs?q=" + keyword)
                        .map(this.extractIDs)
                        .catch(this.handleError);
    }

    getNextTrackIds(keyword: string, nextPageToken: string): Observable<TrackIdList> {
        let URL = this.serverUrl + "TrackIDs?q=" + keyword + "&pageToken=" + nextPageToken;
        return this.http.get(URL)
                        .map(this.extractIDs)
                        .catch(this.handleError);
    }

    getTrack(id: TrackId): Observable<Track> {
        return this.http.get(this.serverUrl + "Tracks?ids=" + JSON.stringify(id))
                        .map(this.extractTrack)
                        .catch(this.handleError);
    }

    private extractIDs(res: Response): TrackIdList {
        return {
            IDs: res.json()["IDs"], 
            NextPageToken: res.json()["NextPageToken"]
        };
    }

    private extractTrack(res: Response) {
        let body = res.json();
        // should always contain only one entry. If not, that's an error
        if (body.length != 1) {
            return {};
        }
        return new Track(body[0].id,
                         body[0].title,
                         body[0].duration, 
                         body[0].thumbnail,
                         new Date());
    }

    private handleError (error: any) {
        console.log("handleError");
        // In a real world app, we might use a remote logging infrastructure
       // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
  }
}
