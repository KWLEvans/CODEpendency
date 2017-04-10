import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.css'],
  providers: [ DeckService ]
})
export class NewDeckComponent implements OnInit {
  deck: Deck;

  constructor(private deckService: DeckService, private router: Router) { }

  ngOnInit() {
    //Replace "Sean" any author name you'd like
    this.deck = new Deck("", "Sean");
  }

  submitForm(newDeck: Deck) {
    let deckId = this.deckService.saveDeck(newDeck);
    this.router.navigate(['decks', deckId]);
  }

}
