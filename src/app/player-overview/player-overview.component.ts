import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Player } from '../player/player.model';

@Component({
  selector: 'player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.css']
})
export class PlayerOverviewComponent implements OnInit {

  @Input() player: Player;

  imageURL: any;

  constructor() { 

  }

  ngOnInit() {
    console.log('initing player overview')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['player'] && this.player !== undefined) {
      console.log('player object changed');
      this.imageURL = this.setImage();
      console.log(this.imageURL);
    }
  }

  setImage() {
    let images = this.player.images;
    
    if (images.length > 0) {
      let min = Infinity;
      let minIndex = 0;
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.width < min) {
          minIndex = i;
        }
      }
      return images[minIndex].url;
    } else {
      return 'assets/images/default-user.png';
    }

  }

}
