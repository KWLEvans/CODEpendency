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
  question: Question;
  answered: boolean = false;
  deckAuthor: string;
  currentDeck: Deck;

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
    this.question = new Question("", "", [], []);
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

  appendAnswer(answerText: string) {
    let repeat = false;
    this.question.answers.forEach(answer => {
      if (answer.text === answerText) {
        repeat = true;
      }
    });

    if (!repeat) {
      let newAnswer = new Answer(answerText, false);
      this.question.answers.push(newAnswer);
    }
  }

  removeAnswer(answerToRemove: Answer) {
    this.question.answers.forEach(answer => {
      if (answer === answerToRemove) {
        if (answer.correct === true) {
          this.answered = false;
        }
        let index = this.question.answers.indexOf(answer);
        this.question.answers.splice(index, 1);
      }
    });
  }

  selectAnswer(answerToSelect: Answer) {
    this.answered = true;
    this.question.answers.forEach(answer => {
      if (answer === answerToSelect) {
        answer.correct = true;
      } else {
        answer.correct = false;
      }
    });
  }

  submitForm(question: Question) {

      question.deck = this.deckId;
      question.authorId = this.deckAuthor;
      this.questionService.saveQuestion(question);
      this.question = new Question("", "", [], []);
  }

}
