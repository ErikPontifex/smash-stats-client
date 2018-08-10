import { Component, OnInit, SimpleChanges, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '../../../node_modules/@angular/material';
import { Set } from '../set/set.model';
import { miom, mpgr } from '../rankings/rankings';
import { HeadToHead } from '../head-to-head/head-to-head.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'head-to-head-table',
  templateUrl: './head-to-head-table.component.html',
  styleUrls: ['./head-to-head-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HeadToHeadTableComponent implements OnInit {

  @Input() sets: Set[];
  @Input() playerID: number;

  globalHeadToHead: HeadToHead[] = [];
  globalHeadToHeadDataSource: MatTableDataSource<HeadToHead>;

  displayedColumns: string[] = ['mpgrRank', 'miomRank', 'record2018', 'record', 'opponentTag'];

  expandedH2H: HeadToHead;

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.sort.sortChange.subscribe(event => {
      console.log(event);
      this.sortHeadToHead(event);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sets'] && this.sets.length !== 0) {
      this.initializeHeadToHead();
    }
    if (changes['playerID']) {
      this.expandedH2H = null;
    }
  }

  sortSetsByOpponentID = (): Set[] => {
    return this.sets.sort((set1: Set, set2: Set) => {
      if (set1.opponentID > set2.opponentID) {
        return 1;
      }
      if (set1.opponentID < set2.opponentID) {
        return -1;
      }
    });
  }

  initializeHeadToHead() {
    let sets = this.sortSetsByOpponentID();

    this.globalHeadToHead = [];

    let headToHead = new HeadToHead({
      opponentID: sets[0]!.opponentID,
      opponentTag: miom[sets[0]!.opponentID] ? miom[sets[0]!.opponentID].tag : sets[0]!.opponentTag,
      miomRank: miom[sets[0]!.opponentID] ? miom[sets[0]!.opponentID].rank : 'unranked',
      mpgrRank: mpgr[sets[0]!.opponentID] ? mpgr[sets[0]!.opponentID].rank : 'unranked'
    });

    for (let i = 0; i < sets.length; i++) {
      const set = sets[i];
      if (set.winnerID == this.playerID) {
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
        headToHead = new HeadToHead({
          opponentID: sets[i+1] ? sets[i+1].opponentID : 0,
          opponentTag: sets[i+1] ? (miom[sets[i+1].opponentID] ? miom[sets[i+1].opponentID].tag  : sets[i+1].opponentTag) : '',
          miomRank: sets[i+1] ? (miom[sets[i+1]!.opponentID] ? miom[sets[i+1]!.opponentID].rank : 'unranked') : '',
          mpgrRank: sets[i+1] ? (mpgr[sets[i+1]!.opponentID] ? mpgr[sets[i+1]!.opponentID].rank : 'unranked') : ''
        });
      }      
    }

    this.sortHeadToHead({active: 'miomRank', direction: 'asc'});
    this.sortHeadToHead({active: 'mpgrRank', direction: 'asc'});
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

  sortHeadToHead(event) {
    this.expandedH2H = null;
    let rank: any = event['active'] === 'miomRank' ? miom : mpgr;
    let order = event['direction'];

    this.globalHeadToHead = this.globalHeadToHead.sort((a, b) => {
      let oppA = rank[a.opponentID] ? rank[a.opponentID].rank : Infinity;
      let oppB = rank[b.opponentID] ? rank[b.opponentID].rank : Infinity;
      if ((oppA > oppB && order === 'asc') || (oppA < oppB && order === 'desc')) {
        return 1;
      }
      if ((oppA < oppB && order === 'asc') || (oppA > oppB && order === 'desc')) {
        return -1;
      }
    });

    this.globalHeadToHeadDataSource = new MatTableDataSource(this.globalHeadToHead);

  }

  onClick(event) {
    console.log(event);
  }

  onClickingH2H(H2H) {
    this.expandedH2H = this.expandedH2H !== H2H ? H2H : null;
    console.log('expandedH2H is ');
    console.log(this.expandedH2H);
  }  
}
