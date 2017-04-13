import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { User } from './../user.model';
import { UserService } from './../user.service';
import { AuthService } from './../providers/auth.service';
import { Question } from './../question.model';
import { QuestionService } from './../question.service';
import { Deck } from './../deck.model';
import { DeckService } from './../deck.service';
import { FlashCardComponent } from './../flash-card/flash-card.component';
import { DeckTileComponent } from './../deck-tile/deck-tile.component';
import { TagPipe } from './../tag.pipe';
import { FilterByTagPipe } from './../filter-by-tag.pipe';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers: [ QuestionService, AuthService, DeckService, UserService ]

})
export class StudyComponent implements OnInit {
  filter: string;
  imageLink: string;
  selectedDeck;
  questions: Question[] = [];
  deckQuestions: Question[] =[];
  selectedQuestion: Question;
  user_displayName;
  isLoggedIn;
  currentUser;
  deckIds: string[] = [];
  decks;
  showDecks: boolean = false;

  constructor(private route: ActivatedRoute, private location: Location, private questionService: QuestionService, private authService: AuthService, private userService: UserService, private deckService: DeckService, private router: Router) {
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
    if(this.authService.currentUserId){
      this.userService.getUserByUId(this.authService.currentUserId).subscribe(returnedUser => {
        this.currentUser = returnedUser[0];
        if(this.currentUser){
        } else {
          let emptyArray = [["vacant question", 0]];
          let newUser = new User(this.authService.currentUserId, emptyArray);
          this.userService.saveUser(newUser);
          this.userService.getUserByUId(this.authService.currentUserId).subscribe(returnedUser =>{
            this.currentUser = returnedUser;
          });
        };
      });
    }

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
    let possibleQuestion;
    let randomIndex;
    if (this.deckQuestions.length > 0)
    {
      randomIndex = Math.floor(this.deckQuestions.length * Math.random());
      possibleQuestion = this.deckQuestions[randomIndex];
    } else {
      randomIndex = Math.floor(this.questions.length * Math.random());
      possibleQuestion = this.questions[randomIndex];
    }
    let userQuestions = this.currentUser.questionsAnswered;
    let questionChosen = false;
    let questionFound = false;
    if(possibleQuestion){
      if(userQuestions){
        for(let i = 0; i < userQuestions.length; i++){
          if (possibleQuestion.text === userQuestions[i][0]){
            questionFound = true;
            let chooseQuestion = userQuestions[i][1];
            let randomizer = Math.floor(4 * Math.random());
            if(randomizer <= chooseQuestion){
              questionChosen = true;
            }
          }
        }
      }
      if(questionChosen === true) {
        this.selectedQuestion = possibleQuestion;
      } else if(questionFound === false) {
        this.selectedQuestion = possibleQuestion;
      } else {
        this.randomQuestion();
      }
      } else {
      alert("No questions available!");
      this.router.navigate(['']);
    }
  }

  answerQuestion(value: boolean) {
    this.addQuestionToUser(value);
    // This is where weighting and sorting answers can happen in the future
    this.randomQuestion();
  }

  getUser(){
  }

  addQuestionToUser(responseValue){
    let userQuestions = this.currentUser.questionsAnswered;
    let questionFound = false;
    let weight = 2;

    if(userQuestions){
      for(let i = 0; i < userQuestions.length; i++){
        if(userQuestions[i][0] === this.selectedQuestion.text){
          if(responseValue === false && userQuestions[i][1] > 5){
            userQuestions[i][1]++;
            questionFound = true;
          } else if (responseValue === true && userQuestions[i][1] > 0) {
            userQuestions[i][1]--;
            questionFound = true;
          }
        }
      };
    }
    if(questionFound === false){
      if(this.currentUser){
        this.currentUser.questionsAnswered.push([this.selectedQuestion.text, weight]);
        this.userService.addQuestion(this.currentUser);
      }
    };
  }

}
