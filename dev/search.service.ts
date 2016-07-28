import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track, TrackId} from './track';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor (private http: Http) {
    }

    private serverUrl = 'http://51.254.143.122:8080/v1/'

    getTrackIds(keyword: string): Observable<TrackId[]> {
        return this.http.get(this.serverUrl + "TrackIDs?q=" + keyword)
                        .map(this.extractIDs)
                        .catch(this.handleError);
    }

    getTrack(id: TrackId): Observable<Track> {
        return this.http.get(this.serverUrl + "Tracks?ids=" + JSON.stringify(id))
                        .map(this.extractTrack)
                        .catch(this.handleError);
    }

    private extractIDs(res: Response) {
        return res.json()["IDs"];
    }

    private extractTrack(res: Response) {
        let body = res.json();
        // should always contain only one entry. If not, that's an error
        if (body.length != 1) {
            return {};
        }
        return body[0];
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
