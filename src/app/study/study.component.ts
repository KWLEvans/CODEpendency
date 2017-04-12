import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from './../question.model';
import { Deck } from './../deck.model';
import { QuestionService } from './../question.service';
import { DeckService } from './../deck.service';
import { FlashCardComponent } from './../flash-card/flash-card.component';
import { TagPipe } from './../tag.pipe';
import { FilterByTagPipe } from './../filter-by-tag.pipe';


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers: [ QuestionService, DeckService ]
})
export class StudyComponent implements OnInit {
  filter: string;
  imageLink: string;
  selectedDeck;
  questions: Question[] = [];
  deckQuestions: Question[] =[];
  selectedQuestion: Question;
  deckIds: string[] = [];
  decks;

  constructor(private route: ActivatedRoute, private location: Location, private questionService: QuestionService, private deckService: DeckService) { }

  ngOnInit() {
    this.decks = this.deckService.getDecks();
    this.route.params.forEach(urlParameters => {
      this.filter = urlParameters['filter'];
    });

    this.selectImageLink();

    this.questionService.getQuestions().subscribe(questionArray => {
      questionArray.forEach(question => {
        let newQuestion = new Question(question.text, question.deck, question.tags, question.answer, question.authorId);
        if (newQuestion.tags.includes(this.filter)) {
          this.questions.push(newQuestion);
        }
      });
    });

    this.questions.forEach(question => {
      if (!this.deckIds.includes(question.deck)) {
        this.deckIds.push(question.deck);
      }
    });
  }

  selectImageLink() {
    switch(this.filter) {
      case "General":
        this.imageLink = "general";
        break;
      case "HTML":
        this.imageLink = "html";
        break;
      case "CSS":
        this.imageLink = "css";
        break;
      case "JavaScript":
        this.imageLink = "js";
        break;
      case "Angular.js":
        this.imageLink = "angular";
        break;
      case "Ember.js":
        this.imageLink = "ember";
        break;
      case "PHP":
        this.imageLink = "php";
        break;
      case "Silex":
        this.imageLink = "silex";
        break;
      case "SQL":
        this.imageLink = "sql";
        break;
      case "Drupal":
        this.imageLink = "drupal";
        break;
    }
  }

  selectDeck(deckId: string) {
    this.selectedDeck = this.deckService.getDeckById(deckId);
    let newQuestions: Question[] = [];
    this.questions.forEach(question => {
      if (question.deck === deckId) {
        newQuestions.push(question);
      }
    });
    this.deckQuestions = newQuestions;
  }

  randomQuestion() {
    let randomIndex = Math.floor(this.questions.length * Math.random());
    if (this.deckQuestions.length > 0) {
      this.selectedQuestion = this.deckQuestions[randomIndex];
    } else {
      this.selectedQuestion = this.questions[randomIndex];
    }
  }

  answerQuestion(value: boolean) {
    // This is where weighting and sorting answers can happen in the future
    console.log(value);
    this.randomQuestion();
  }

}
