import { Component, OnInit, Input } from '@angular/core';
import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';
import { Answer } from './../answer.model';

import { Question } from './../question.model';
import { QuestionService } from './../question.service';
import { AuthService } from './../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [ QuestionService, AuthService, DeckService ]
})
export class QuestionFormComponent implements OnInit {
  @Input() deckId: string;
  @Input() questionToEdit;

  answered: boolean = false;
  deckAuthor: string;
  currentDeck;
  question;

  constructor(private questionService: QuestionService, private authService: AuthService, private router: Router, private deckService: DeckService) {  }

  ngOnInit() {

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

    if (this.questionToEdit) {
      this.question = this.questionToEdit;
    } else {
      this.question = new Question("", "", [], "")
    }
  }


  appendTag(tagToAppend: string) {
    if (!this.question.tags.includes(tagToAppend)) {
      this.question.tags.push(tagToAppend);
    }
  }

  removeTag(tagToRemove: string) {
    this.question.tags.forEach(tag => {
      if (tag === tagToRemove) {
        let index = this.question.tags.indexOf(tag);
        this.question.tags.splice(index, 1);
      }
    });
  }

  submitForm(question) {

    this.deckService.getDeckById(this.deckId).subscribe(returnedDeck => {
      this.currentDeck = returnedDeck;
    });
    if(this.currentDeck.author === this.deckAuthor)
    {
      if (this.questionToEdit) {
        this.questionService.updateQuestion(question);
      } else {
        question.deck = this.deckId;
        question.authorId = this.deckAuthor;
        this.questionService.saveQuestion(question);
      }
      this.question = new Question("", "", [], "");
    } else {
      alert("deck author does not match currently logged author");
    }
  }
}
