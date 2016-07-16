import {describe, expect, it, xit, inject, injectAsync, beforeEachProviders} from '@angular/core/testing';

import {provide} from '@angular/core';

import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import 'rxjs/Rx'

import {SearchService} from './search.service';
import {SearchComponent} from './search.component';
import {Track, TrackId} from './track';

describe('Search Service', () => {

  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      { provide: XHRBackend, useClass: MockBackend },
      SearchService
    ];
  });

  it('should get track id', 
    inject([XHRBackend, SearchService], (mockBackend, searchService) => {

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
                {
                  id: "sometrackid",
                  source: "sometracksource"
                }]
          }
        )));
      }
    );
      
    searchService.getTrackIds().subscribe((tracks: TrackId[]) => {
      expect(tracks.length).toBe(1);
      expect(tracks[0].id).toBe("sometrackid")
    });
  }));

  it('should get track', 
    inject([XHRBackend, SearchService], (mockBackend, searchService) => {

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
                {
                  id: {id: "fk4BbF7B29w", source: "YouTube"},
                  title: "Adele - Send My Love (To Your New Lover)",
                  duration: "PT3M46S",
                  thumbnail: {
                    default: "test.png",
                    high: "none"
                  }
                }]
          }
        )));
      }
    );
      
    var dummyTrack: TrackId = {
        id: "sometrackid",
        source: "somesourceid"
    }
    searchService.getTrack(dummyTrack).subscribe((track: Track) => {
      expect(track.id.source).toBe("YouTube");
      expect(track.thumbnail.default).toBe("test.png");
    });
  }));

});