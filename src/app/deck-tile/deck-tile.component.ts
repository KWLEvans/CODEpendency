import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deck-tile',
  templateUrl: './deck-tile.component.html',
  styleUrls: ['./deck-tile.component.css']
})
export class DeckTileComponent implements OnInit {
  @Input() deck;
  @Output() deckSelector = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectDeck(deckId: string) {
    this.deckSelector.emit(deckId);
  }

}
