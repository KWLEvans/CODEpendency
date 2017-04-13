import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Deck } from './deck.model';

@Injectable()
export class DeckService {
  decks: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.decks = this.angularFire.database.list('decks');
  }

  getDecks() {
    return this.decks;
  }

  getDeckById(deckId: string) {
    return this.angularFire.database.object('decks/' + deckId);
  }

  saveDeck(deck: Deck) {
    let newRef = this.decks.push(deck);
    return newRef.key;
  }

  deleteDeck(deckId: string) {
    this.getDeckById(deckId).remove();
  }
}
