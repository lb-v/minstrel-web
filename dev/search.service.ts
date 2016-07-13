import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track, TrackId} from './track';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor (private http: Http) {}

    private serverUrl = 'http://51.254.143.122:8080/v1/'

    getTracks(keyword: string): Observable<TrackId[]> {
        return this.http.get(this.serverUrl + "TrackIDs?q="+keyword)
                        .map(this.extractIDs)
                        .catch(this.handleError);
    }

    private extractIDs(res: Response) {
        let body = res.json();
        var trackIDs : TrackId[] = [];
        for (var index = 0; index < body.length; index++) {
            trackIDs.push(body[index]);
        }
        return trackIDs;
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
