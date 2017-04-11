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
        if (auth == null) {
          this.router.navigate(['login']);
          this.deckAuthor = null;
          this.authService.currentUserId = null;
        } else {
          this.deckAuthor = auth.google.displayName;
          this.authService.currentUserId = auth.uid;
        }
      }
    );
  }


  ngOnInit() {

    //Replace "Sean" any author name you'd like
    this.deck = new Deck("", this.deckAuthor);
  }

  submitForm(newDeck: Deck) {
    let deckId = this.deckService.saveDeck(newDeck);
    this.router.navigate(['decks', deckId]);
  }

}
