import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';
import { AuthService } from './../providers/auth.service';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.css'],
  providers: [ DeckService, AuthService ]
})
export class NewDeckComponent implements OnInit {
  deck: Deck;
  deckAuthor: string;

  constructor (private deckService: DeckService, private authService: AuthService,  private router: Router) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth === null) {
          this.router.navigate(['login']);
          this.deckAuthor = null;
        } else {
          this.deckAuthor = auth.google.displayName;
        }
      }
    );
  }


  ngOnInit() {
    this.deck = new Deck("", "");
  }

  submitForm(newDeck: Deck) {
    newDeck.author = this.deckAuthor;
    let deckId = this.deckService.saveDeck(newDeck);
    this.router.navigate(['decks', deckId]);
  }

}
