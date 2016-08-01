import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Track, TrackId, TrackIdList} from '../track';
import {Observable} from 'rxjs/Observable';


export declare abstract class SearchEventListener {
    abstract onNewQueryStarted(keyword: string);
    abstract onNextPageTokenChanged(nextPageToken: string);
    abstract onTracksFound(tracks: Track[]);
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
                var trackObs = this.getTracks(trackIdList.IDs);
                trackObs.subscribe( 
                    (tracks: Track[]) => {
                        // notify of found track
                        if (this.eventListener == null) {
                            return;
                        }
                        this.eventListener.onTracksFound(tracks);
                    }
                );
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

    getTracks(ids: TrackId[]): Observable<Track[]> {
        var stringIds = "";
        for (var index=0; index < ids.length; index++) {
            stringIds = stringIds + JSON.stringify(ids[index]);
        }
        return this.http.get(this.serverUrl + "Tracks?ids=" + stringIds)
                        .map(this.extractTracks)
                        .catch(this.handleError);
    }

    private extractIDs(res: Response): TrackIdList {
        return {
            IDs: res.json()["IDs"], 
            NextPageToken: res.json()["NextPageToken"]
        };
    }

    private extractTracks(res: Response) {
        let body = res.json();
        var tracks: Track[] = [];
        for (var index=0; index < body.length; index++) {
            tracks.push(new Track(body[index].id,
                                  body[index].title,
                                  {millisecond: body[index].duration}, 
                                  body[index].thumbnail,
                                  new Date()));
        }
        return tracks;
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
