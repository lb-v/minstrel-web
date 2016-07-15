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

  it('should get tracks', 
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
      
    searchService.getTracks().subscribe((tracks: TrackId[]) => {
      expect(tracks.length).toBe(1);
      expect(tracks[0].id).toBe("sometrackid")
    });

  }));

});