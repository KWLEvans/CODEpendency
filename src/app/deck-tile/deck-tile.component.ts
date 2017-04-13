import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-tile',
  templateUrl: './deck-tile.component.html',
  styleUrls: ['./deck-tile.component.css']
})
export class DeckTileComponent implements OnInit {
  @Input() deck;
  @Output() deckSelector = new EventEmitter();
  currentRoute;
  fontSize;

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.setSize();
  }

  selectDeck(deckId: string) {
    this.deckSelector.emit(deckId);
  }

  setSize() {
    if (this.deck.name.length > 20) {
      this.fontSize = 25;
    } else {
      this.fontSize = 30;
    }
    console.log(this.fontSize);
  }

}
