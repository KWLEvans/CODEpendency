import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from './../providers/auth.service';
import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';
import { Question } from './../question.model';
import { QuestionService } from './../question.service';

@Component({
  selector: 'app-your-decks',
  templateUrl: './your-decks.component.html',
  styleUrls: ['./your-decks.component.css'],
  providers: [ DeckService, AuthService, QuestionService ]
})
export class YourDecksComponent implements OnInit {

  user_displayName;
  isLoggedIn;
  currentUser;
  deckss = [];
  displayDeckss = [];
  userDecks: Deck [] = [];
  displayDecks: Deck [] = [];

  constructor(private deckService: DeckService, private authService: AuthService,  private router: Router, private questionService: QuestionService) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.authService.currentUserName = null;
          this.authService.currentUserId = null;
        } else {
          this.isLoggedIn = true;
          this.user_displayName = auth.google.displayName;
          this.authService.currentUserName = auth.google.displayName;
          this.authService.currentUserId = auth.uid;
        }
      }
    );
  }


  ngOnInit() {
    this.deckService.getDecks().subscribe( deckArray => {
      deckArray.forEach(deck => {
          this.deckss.push(deck);
      });
    });
    this.deckss.forEach(deck => {
        if(deck.author === this.user_displayName){
          this.displayDeckss.push(deck);
        }
    });
  }

  goToDeck(deckId: string) {
    this.router.navigate(['decks', deckId]);
  }



}
