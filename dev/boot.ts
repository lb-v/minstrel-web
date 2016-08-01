import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app.component";

import {HTTP_PROVIDERS} from '@angular/http';
import {PlaylistService} from "./Playlist/playlist.service";

import {PlayerFactory} from "./Player/player.factory";
import {Player} from "./Player/player";
import {MasterPlayerService} from "./Player/master-player.service";
import {YouTubePlayer} from "./Player/YouTube/youtube-player";

var gPlaylistService = new PlaylistService();

// register each player here
var gPlayerFactory = new PlayerFactory();
var gYouTubePlayer = new YouTubePlayer();
gPlayerFactory.register(gYouTubePlayer, "YouTube");

// master player is a player event listener
var gMasterPlayer = new MasterPlayerService(gPlaylistService.manager);
gYouTubePlayer.setPlayerEventListener(gMasterPlayer);

bootstrap(AppComponent, 
          [ 
            HTTP_PROVIDERS, 
            provide(PlaylistService, {useValue: gPlaylistService}) ,
            provide(PlayerFactory, {useValue: gPlayerFactory}),
            provide(YouTubePlayer, {useValue: gYouTubePlayer}),
            provide(MasterPlayerService, {useValue: gMasterPlayer})
          ]);