import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { merge } from 'rxjs';
import { Set } from '../set/set.model';

@Component({
  selector: 'set-table',
  templateUrl: './set-table.component.html',
  styleUrls: ['./set-table.component.css']
})
export class SetTableComponent implements OnInit {
  @Input() sets;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedSets: Set[] = [];

  displayedColumns: string[] = ['playerScore', 'opponentID', 'tournamentName', 'round', 'time'];

  constructor() { }

  ngOnInit() {
    merge(this.paginator.page, this.sort.sortChange).subscribe(event => {
      console.log(event);
      this.getSetsToDisplay();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sets']) {
      this.getSetsToDisplay();
      console.log(this.displayedSets);
    }
  }

  getSetsToDisplay() {
    console.log('getting sets to display');
    let index       =     this.paginator.pageIndex;
    let size        =     this.paginator.pageSize;
    let sort        =     this.sort.active;
    let sortOrder   =     this.sort.direction;

    this.sets = this.sets.sort((set1: Set, set2: Set) => {
      if ((set1[sort] > set2[sort] && sortOrder === 'asc') || (set1[sort] < set2[sort] && sortOrder === 'desc')) {
        return 1;
      }
      if ((set1[sort] < set2[sort] && sortOrder === 'asc') || (set1[sort] > set2[sort] && sortOrder === 'desc')) {
        return -1;
      }
    });

    this.displayedSets = this.sets.slice(index*size, (index+1)*size);
  }

  displayResult(set: Set): string {
    if (set.player1Score === null) {
      return set.opponentID === set.loserID ? 'won' : 'lost';
    } else {
      return set.playerScore + " - " + set.opponentScore;
    }
  }

}
