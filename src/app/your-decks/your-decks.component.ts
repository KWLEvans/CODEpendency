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

  constructor(private deckService: DeckService, private authService: AuthService,  private router: Router, private questionService: QuestionService) { }

  loggedInUser: string;
  decks;
  userDecks: Deck [] = [];

  ngOnInit() {
    this.deckService.getDecks().subscribe(deckArray => {
      deckArray.forEach(deck => {
        let currentDeck = new Deck(deck.name, deck.author);
        this.userDecks.push(currentDeck);
      });
    });
  }



}
