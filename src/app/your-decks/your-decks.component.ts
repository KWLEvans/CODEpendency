import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../providers/auth.service';
import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';
import { FilterByAuthorPipe } from './../filter-by-author.pipe';

@Component({
  selector: 'app-your-decks',
  templateUrl: './your-decks.component.html',
  styleUrls: ['./your-decks.component.css'],
  providers: [ DeckService, AuthService ]
})
export class YourDecksComponent implements OnInit {

  user_displayName;
  isLoggedIn: boolean;
  decks;

  constructor(private deckService: DeckService, private authService: AuthService, private router: Router) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth === null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
        } else {
          this.isLoggedIn = true;
          this.user_displayName = auth.google.displayName;
        }
      }
    );
  }

  ngOnInit() {
    this.decks = this.deckService.getDecks();
  }

  goToDeck(deckId: string) {
    this.router.navigate(["decks/", deckId]);
  }
}
