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
import { MatPaginator, MatSort, MatTableDataSource } from '../../../node_modules/@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';


let miom = {
  1004:   {   rank: 1,    tag: 'Hungrybox'      },
  6189:   {   rank: 2,    tag: 'Armada'         },
  1000:   {   rank: 3,    tag: 'Mang0'          },
  1003:   {   rank: 4,    tag: 'Mew2King'       },
  15990:  {   rank: 5,    tag: 'Plup'           },
  4465:   {   rank: 6,    tag: 'Leffen'         },
  16342:  {   rank: 7,    tag: 'Axe'            },
  1028:   {   rank: 8,    tag: 'Wizzrobe'       }, 
  1019:   {   rank: 9,    tag: 'SFAT'           }, 
  1017:   {   rank: 10,   tag: 'S2J'            }, 
  15179:  {   rank: 11,   tag: 'ChuDat'         }, 
  4442:   {   rank: 12,   tag: 'Druggedfox'     }, 
  1013:   {   rank: 13,   tag: 'Shroomed'       }, 
  1037:   {   rank: 14,   tag: 'Duck'           }, 
  4401:   {   rank: 15,   tag: 'Crush'          }, 
  1055:   {   rank: 16,   tag: 'Swedish Delight'}, 
  13932:  {   rank: 17,   tag: 'Lucky'          }, 
  1008:   {   rank: 18,   tag: 'Westballz'      }, 
  4507:   {   rank: 19,   tag: 'La Luna'        }, 
  4107:   {   rank: 20,   tag: 'n0ne'           }, 
  1012:   {   rank: 21,   tag: 'PewPewU'        }, 
  6126:   {   rank: 22,   tag: 'Zain'           }, 
  1036:   {   rank: 23,   tag: 'HugS'           }, 
  1021:   {   rank: 24,   tag: 'aMSa'           }, 
  4721:   {   rank: 25,   tag: 'Mike Haze'      },
  15634:  {   rank: 26,   tag: 'lloD'           },
  3915:   {   rank: 27,   tag: 'dizzkidboogie'  },
  19573:  {   rank: 28,   tag: 'Ice'            },
  1022:   {   rank: 29,   tag: 'KirbyKaze'      },
  1009:   {   rank: 30,   tag: 'Colbol'         },
  22900:  {   rank: 31,   tag: 'Trif'           },
  4111:   {   rank: 32,   tag: 'Ryan Ford'      },
  39966:  {   rank: 33,   tag: 'Syrox'          },
  3560:   {   rank: 34,   tag: 'KJH'            },
  1023:   {   rank: 35,   tag: 'Nintendude'     },
  13306:  {   rank: 36,   tag: 'Rishi'          },
  1032:   {   rank: 37,   tag: 'Bladewise'      },
  5878:   {   rank: 38,   tag: 'Prince Abu'     },
  5956:   {   rank: 39,   tag: 'Amsah'          },
  260408: {   rank: 40,   tag: 'Santiago'       },
  5563:   {   rank: 41,   tag: 'Professor Pro'  },
  1061:   {   rank: 42,   tag: 'Slox'           },
  1077:   {   rank: 43,   tag: 'Gahtzu'         },
  12870:  {   rank: 44,   tag: 'Android'        },
  1007:   {   rank: 45,   tag: 'Hax'            },
  1044:   {   rank: 46,   tag: 'Kage'           },
  4824:   {   rank: 47,   tag: 'Captain Smuckers'},
  1024:   {   rank: 48,   tag: 'MacD'           },
  3561:   {   rank: 49,   tag: 'Ginger'         },
  1089:   {   rank: 50,   tag: 'Laudandus'      },
  1027:   {   rank: 51,   tag: 'Kels'           },
  3359:   {   rank: 52,   tag: 'Captain Faceroll'},
  23458:  {   rank: 53,   tag: 'ARMY'           },
  5620:   {   rank: 54,   tag: 'Junebug'        },
  40476:  {   rank: 55,   tag: 'Medz'           },
  1033:   {   rank: 56,   tag: 'Abate'          },
  1493:   {   rank: 57,   tag: 'Chillin'        },
  4648:   {   rank: 58,   tag: 'Squid'          },
  3378:   {   rank: 59,   tag: 'Azusa'          },
  22556:  {   rank: 60,   tag: 'Overtriforce'   },
  3357:   {   rank: 61,   tag: 'Spark'          },
  27353:  {   rank: 62,   tag: 'Ka-Master'      },
  5925:   {   rank: 63,   tag: 'Trulliam'       },
  1041:   {   rank: 64,   tag: 'Cactuar'        },
  1069:   {   rank: 65,   tag: 'Redd'           },
  1020:   {   rank: 66,   tag: 'Zhu'            },
  7162:   {   rank: 67,   tag: 'Darkatma'       },
  6839:   {   rank: 68,   tag: 'Drephen'        },
  4518:   {   rank: 69,   tag: 'FatGoku'        },
  1039:   {   rank: 70,   tag: 'Kalamazhu'      },
  1030:   {   rank: 71,   tag: 'Eddy Mexico'    },
  16148:  {   rank: 72,   tag: 'Drunksloth'     },
  59086:  {   rank: 73,   tag: 'Cal'            },
  37339:  {   rank: 74,   tag: 'AbsentPage'     },
  148835: {   rank: 75,   tag: 'King Momo'      },
  1038:   {   rank: 76,   tag: 'DJ Nintendo'    },
  3954:   {   rank: 77,   tag: 'HomeMadeWaffles'},
  171163: {   rank: 78,   tag: 'Lovage'         },
  1097:   {   rank: 79,   tag: 'MilkMan'        },
  1084:   {   rank: 80,   tag: 'Tai'            },
  7097:   {   rank: 81,   tag: 'Rik'            },
  4215:   {   rank: 82,   tag: 'Rocky'          },
  32097:  {   rank: 83,   tag: 'Jerry'          },
  19554:  {   rank: 84,   tag: 'iBDW'           },
  14436:  {   rank: 85,   tag: 'KPAN'           },
  1096:   {   rank: 86,   tag: 'Mojo'           },
  7865:   {   rank: 87,   tag: '$mike'          },
  220477: {   rank: 88,   tag: 'Darktooth'      },
  48789:  {   rank: 89,   tag: 'Zgetto'         },
  1068:   {   rank: 90,   tag: 'Blea Gelo'      },
  15903:  {   rank: 91,   tag: 'Kaeon'          },
  22158:  {   rank: 92,   tag: 'Bobby Frizz'    },
  11460:  {   rank: 93,   tag: 'Iceman'         },
  3385:   {   rank: 94,   tag: 'L'              },
  3355:   {   rank: 95,   tag: 'NMW'            },
  5080:   {   rank: 96,   tag: 'Moky'           },
  26761:  {   rank: 97,   tag: 'Legend'         },
  4240:   {   rank: 98,   tag: 'Zealous5000'    },
  4505:   {   rank: 99,   tag: 'Ralph'          },
  20995:  {   rank: 100,  tag: '2Saint'         },
  7103:   {   rank: 101,  tag: 'Reeve'          },
  46827:  {   rank: 102,  tag: 'Bananas'        },
  5327:   {   rank: 103,  tag: 'Nightmare'      },
  7072:   {   rank: 104,  tag: 'Vro'            }
}

let mpgr = {
  1004:   {   rank: 1,    tag: 'Hungrybox'      },
  15990:  {   rank: 2,    tag: 'Plup'           },
  6189:   {   rank: 3,    tag: 'Armada'         },
  4465:   {   rank: 4,    tag: 'Leffen'         },
  1003:   {   rank: 5,    tag: 'Mew2King'       },
  1000:   {   rank: 6,    tag: 'Mang0'          },
  1028:   {   rank: 7,    tag: 'Wizzrobe'       }, 
  1021:   {   rank: 8,   tag: 'aMSa'           }, 
  6126:   {   rank: 9,   tag: 'Zain'           }, 
  16342:  {   rank: 10,    tag: 'Axe'            },
  1019:   {   rank: 11,    tag: 'SFAT'           }, 
  4401:   {   rank: 12,   tag: 'Crush'          }, 
  1017:   {   rank: 13,   tag: 'S2J'            }, 
  13932:  {   rank: 14,   tag: 'Lucky'          }, 
  1036:   {   rank: 15,   tag: 'HugS'           }, 
  1055:   {   rank: 16,   tag: 'Swedish Delight'}, 
  1012:   {   rank: 17,   tag: 'PewPewU'        }, 
  1008:   {   rank: 18,   tag: 'Westballz'      }, 
  4107:   {   rank: 19,   tag: 'n0ne'           }, 
  1037:   {   rank: 20,   tag: 'Duck'           }, 
  15634:  {   rank: 21,   tag: 'lloD'           },
  37339:  {   rank: 22,   tag: 'AbsentPage'     },
  4111:   {   rank: 23,   tag: 'Ryan Ford'      },
  3560:   {   rank: 24,   tag: 'KJH'            },
  1013:   {   rank: 25,   tag: 'Shroomed'       }, 
  23458:  {   rank: 26,   tag: 'ARMY'           },
  4507:   {   rank: 27,   tag: 'La Luna'        }, 
  39966:  {   rank: 28,   tag: 'Syrox'          },
  22900:  {   rank: 29,   tag: 'Trif'           },
  4824:   {   rank: 30,   tag: 'Captain Smuckers'},
  1009:   {   rank: 31,   tag: 'Colbol'         },
  19554:  {   rank: 32,   tag: 'iBDW'           },
  46827:  {   rank: 33,   tag: 'Bananas'        },
  3561:   {   rank: 34,   tag: 'Ginger'         },
  19573:  {   rank: 35,   tag: 'Ice'            },
  13306:  {   rank: 36,   tag: 'Rishi'          },
  4721:   {   rank: 37,   tag: 'Mike Haze'      },
  1032:   {   rank: 38,   tag: 'Bladewise'      },
  3359:   {   rank: 39,   tag: 'Captain Faceroll'},
  5620:   {   rank: 40,   tag: 'Junebug'        },
  1039:   {   rank: 41,   tag: 'Kalamazhu'      },
  20995:  {   rank: 42,   tag: '2Saint'         },
  1061:   {   rank: 43,   tag: 'Slox'           },
  1077:   {   rank: 44,   tag: 'Gahtzu'         },
  26605:  {   rank: 45,   tag: 'Michael'        },
  5080:   {   rank: 46,   tag: 'Moky'           },
  260408: {   rank: 47,   tag: 'Santi'          },
  5563:   {   rank: 48,   tag: 'Professor Pro'  },
  40476:  {   rank: 49,   tag: 'Medz'           },
  22556:  {   rank: 50,   tag: 'Overtriforce'   },

}

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css'],
  providers: [SetService, PlayerService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  globalHeadToHead = [];
  globalHeadToHeadDataSource: MatTableDataSource<any>;

  
  displayedColumnsH2H: string[] = ['mpgrRank', 'miomRank', 'record2018', 'record', 'opponentTag'];

  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

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
    
    merge(this.sort.sortChange).subscribe(event => {
      console.log(event);
      this.getSetsToDisplay();
    });
  }

  initializePlayer(playerID: Number) {
    console.log('initializing player ' + playerID);
    // this.paginator.firstPage();
    this.playerService.getPlayer(playerID).subscribe(player => {
      this.player = player;
      this.getAllSets();
    });
  }

  getAllSets() {
    this.isLoadingResults = true;
    this.setService.getAllSetsForPlayer(this.player.playerID).subscribe(sets => {
      this.sets = sets;
      console.log(this.sets.slice(this.sets.length-10, this.sets.length));
      this.pruneSets();
      this.isLoadingResults = false;
      this.getSetsToDisplay();
      this.initializeHeadToHead();
    });
  }

  getSetsToDisplay() {
    // let index = this.paginator.pageIndex;
    // let size = this.paginator.pageSize;
    // let sort = this.sort.active;
    // let sortOrder = this.sort.direction;

    // this.sets = this.sets.sort((set1: Set, set2: Set) => {
    //   if ((set1[sort] > set2[sort] && sortOrder === 'asc') || (set1[sort] < set2[sort] && sortOrder === 'desc')) {
    //     return 1;
    //   }
    //   if ((set1[sort] < set2[sort] && sortOrder === 'asc') || (set1[sort] > set2[sort] && sortOrder === 'desc')) {
    //     return -1;
    //   }
    // });

    // this.displayedSets = this.sets.slice(index*size, (index+1)*size);

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

  initializeHeadToHead() {
    let sets = this.sets.sort((set1: Set, set2: Set) => {
      if (set1.opponentID > set2.opponentID) {
        return 1;
      }
      if (set1.opponentID < set2.opponentID) {
        return -1;
      }
    });
    
    // console.log('sets sorted by opponentID:');
    // console.log(sets);

    this.globalHeadToHead = [];
    let headToHead = {
      sets: [],
      opponentID: sets[0]!.opponentID,
      opponentTag: miom[sets[0]!.opponentID] ? miom[sets[0]!.opponentID].tag : sets[0]!.opponentTag,
      playerRecord: 0,
      opponentRecord: 0,
      playerRecord2018: 0,
      opponentRecord2018: 0,
      miomRank: miom[sets[0]!.opponentID] ? miom[sets[0]!.opponentID].rank : 'unranked',
      mpgrRank: mpgr[sets[0]!.opponentID] ? mpgr[sets[0]!.opponentID].rank : 'unranked'
    }

    for (let i = 0; i < sets.length; i++) {
      const set = sets[i];
      if (set.winnerID === this.player.playerID) {
        headToHead.playerRecord++;
        if (set.time > new Date('January 1, 2018 00:00:00 GMT+00:00').getTime()/1000) {
          headToHead.playerRecord2018++;
        }
      }
      else { 
        headToHead.opponentRecord++;
        if (set.time > new Date('January 1, 2018 00:00:00 GMT+00:00').getTime()/1000) {
          headToHead.opponentRecord2018++;
        }
      }
      headToHead.sets.push(set);

      if (i+1 === sets.length || sets[i+1].opponentID !== headToHead.opponentID) {
        this.globalHeadToHead.push(headToHead);
        headToHead = {
          sets: [],
          opponentID: sets[i+1] ? sets[i+1].opponentID : 0,
          opponentTag: sets[i+1] ? (miom[sets[i+1].opponentID] ? miom[sets[i+1].opponentID].tag  : sets[i+1].opponentTag) : '',
          playerRecord: 0,
          opponentRecord: 0,
          playerRecord2018: 0,
          opponentRecord2018: 0,
          miomRank: sets[i+1] ? (miom[sets[i+1]!.opponentID] ? miom[sets[i+1]!.opponentID].rank : 'unranked') : '',
          mpgrRank: sets[i+1] ? (mpgr[sets[i+1]!.opponentID] ? mpgr[sets[i+1]!.opponentID].rank : 'unranked') : ''

        }
      }      
    }
    this.globalHeadToHead = this.globalHeadToHead.sort((a, b) => {
      let oppA = miom[a.opponentID] ? miom[a.opponentID].rank : Infinity;
      let oppB = miom[b.opponentID] ? miom[b.opponentID].rank : Infinity;
      if (oppA > oppB) {
        return 1;
      }
      if (oppA < oppB) {
        return -1;
      }
    });

    this.globalHeadToHead = this.globalHeadToHead.sort((a, b) => {
      let oppA = mpgr[a.opponentID] ? mpgr[a.opponentID].rank : Infinity;
      let oppB = mpgr[b.opponentID] ? mpgr[b.opponentID].rank : Infinity;
      if (oppA > oppB) {
        return 1;
      }
      if (oppA < oppB) {
        return -1;
      }
    });


    this.globalHeadToHeadDataSource = new MatTableDataSource(this.globalHeadToHead);

    this.isLoadingHeadToHeadResults = false;
  }

  redirect(playerID: number) {
    console.log('playerID: ' + playerID)
    // this.router.navigate(['/player', playerID]);
    this.router.navigateByUrl(`/player/${playerID}`);
    this.initializePlayer(playerID);
  }

  displayResult(set: Set): string {
    if (set.player1Score === null) {
      return set.opponentID === set.loserID ? 'won' : 'lost';
    } else {
      return set.playerScore + " - " + set.opponentScore;
    }
  }

  applyFilter(filterValue: string) {
    this.globalHeadToHeadDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }



}
