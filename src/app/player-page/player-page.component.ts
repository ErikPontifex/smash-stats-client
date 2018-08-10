import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SetService } from '../set/set.service';
import { Observable, merge, of as observableOf} from 'rxjs';
import { Set } from '../set/set.model';
import { ActivatedRoute, Router} from '@angular/router';
import { PlayerService } from '../player/player.service';
import { auditTime} from 'rxjs/operators';
import {Location} from "@angular/common";

import { Player } from '../player/player.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css'],
  providers: [SetService, PlayerService],
})
export class PlayerPageComponent implements OnInit {
  myControl = new FormControl();
  options: Observable<Object>;

  playerID = 1000;

  resultsLength = 0;
  isLoadingResults = true;
  isLoadingHeadToHeadResults = true;
  isRateLimitReached = false;

  sets: Set[] = [];
  displayedSets: Set[] = [];
  player: Player;

  constructor(
    private setService: SetService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    console.log('constructor');
    this.myControl.valueChanges.pipe(auditTime(400)).subscribe(data => {
      this.options = this.playerService.searchPlayers(data);
    });

    this.route.params.subscribe(params => {
      this.playerID = params.id ? params.id : 1000;
    });
  }
  
  
  ngOnInit() {
    this.initializePlayer(this.playerID);

    this.location.subscribe(event => {
      this.playerID = Number(event.url.split('/')[event.url.split('/').length-1]);
      this.initializePlayer(this.playerID);
    });
  }

  initializePlayer(playerID: Number) {
    console.log('initializing player ' + playerID);
    this.playerService.getPlayer(playerID).subscribe(player => {
      this.player = player;
      this.getAllSets();
    });
  }

  getAllSets() {
    this.isLoadingResults = true;
    this.setService.getAllSetsForPlayer(this.player.playerID).subscribe(sets => {
      this.sets = sets;
      this.pruneSets();
      this.isLoadingResults = false;
    });
  }

  displayFn(player: Player): String | undefined{
    return player ? player.gamerTag : undefined;
  }

  pruneSets() {
    this.sets;
    for (let i = 0; i < this.sets.length; i++) {
      const set = this.sets[i];
      if (set['player1ID'] !== this.player.playerID) {
        this.sets[i].opponentID     = set.player1ID;
        this.sets[i].opponentTag    = set.player1Tag;
        this.sets[i].opponentScore  = set.player1Score;
        this.sets[i].playerScore    = set.player2Score;
      } else {
        this.sets[i].opponentID     = set.player2ID;
        this.sets[i].opponentTag    = set.player2Tag;
        this.sets[i].opponentScore  = set.player2Score;
        this.sets[i].playerScore    = set.player1Score;
      }
    }
  }

  redirect(playerID: number) {
    this.router.navigateByUrl(`/player/${playerID}`);
    this.initializePlayer(playerID);
  }
}
