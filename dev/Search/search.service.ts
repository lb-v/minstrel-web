import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track, TrackId, TrackIdList} from '../track';
import {Observable} from 'rxjs/Observable';


export declare abstract class SearchEventListener {
    abstract onNewQueryStarted(keyword: string);
    abstract onNextPageTokenChanged(nextPageToken: string);
    abstract onTrackFound(track: Track);
}

@Injectable()
export class SearchService {
    private serverUrl = 'http://51.254.143.122:8080/v1/'
    private eventListener: SearchEventListener = null;

    constructor (private http: Http) {}

    setEventListener(eventListener: SearchEventListener) {
        this.eventListener = eventListener;
    }

    // TODO: factorize that monster function
    search(keyword: string) {
        // notify of new search first
        if (this.eventListener == null) {
            return;
        }
        this.eventListener.onNewQueryStarted(keyword);

        // do the search
        var observable = this.getTrackIds(keyword);
        observable.subscribe(
            (trackIdList: TrackIdList) => {
                // notify of next page
                if (this.eventListener == null) {
                    return;
                }       
                this.eventListener.onNextPageTokenChanged(trackIdList.NextPageToken);

                // find tracks
                for (var index = 0; index < trackIdList.IDs.length; index++) {
                    var trackObs = this.getTrack(trackIdList.IDs[index]);
                    trackObs.subscribe( 
                        (track: Track) => {
                            // notify of found track
                            if (this.eventListener == null) {
                                return;
                            }    
                            this.eventListener.onTrackFound(track);
                        }
                    );
                }
            }
        );
    }

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
                         {millisecond: body[0].duration}, 
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
