import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.css']
})
export class PlayerOverviewComponent implements OnInit {

  @Input() player;

  constructor() { }

  ngOnInit() {
  }

}
