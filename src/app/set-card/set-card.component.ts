import { Component, OnInit, Input } from '@angular/core';
import { Set } from '../set/set.model';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.css']
})
export class SetCardComponent implements OnInit {
  @Input() set: Set;
  @Input() index: Number;

  constructor() { }

  ngOnInit() {
  }

}
