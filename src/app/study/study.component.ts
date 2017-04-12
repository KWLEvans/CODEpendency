import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User } from './../user.model';
import { Question } from './../question.model';
import { Deck } from './../deck.model';
import { QuestionService } from './../question.service';
import { DeckService } from './../deck.service';
import { FlashCardComponent } from './../flash-card/flash-card.component';
import { TagPipe } from './../tag.pipe';
import { AuthService } from './../providers/auth.service';
import { UserService } from './../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FilterByTagPipe } from './../filter-by-tag.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers: [ QuestionService, AuthService, DeckService, UserService ]

})
export class StudyComponent implements OnInit {
  filter: string;
  questions: Question[] = [];
  deckQuestions: Question[] =[];
  selectedQuestion: Question;
  user_displayName;
  isLoggedIn;
  currentUser;
  deckIds: string[] = [];
  decks;

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
          console.log(this.currentUser);
        } else {
          let emptyArray = [["vacant question", 0]];
          let newUser = new User(this.authService.currentUserId, emptyArray);
          console.log("new user" + newUser);
          this.userService.saveUser(newUser);
          this.userService.getUserByUId(this.authService.currentUserId).subscribe(returnedUser =>{
            this.currentUser = returnedUser;
            console.log(this.currentUser);
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

  selectDeck(deckId: string) {
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
    let randomIndex
    console.log(this.questions);
    if (this.deckQuestions.length > 0)
    {
      console.log('hi i am a deck');
      console.log(this.deckQuestions);
      randomIndex = Math.floor(this.deckQuestions.length * Math.random());
      possibleQuestion = this.deckQuestions[randomIndex];
    } else {
      console.log('hi i am not a deck');
      randomIndex = Math.floor(this.questions.length * Math.random());
      console.log(randomIndex);
      possibleQuestion = this.questions[randomIndex];
      console.log(possibleQuestion);
    }
    let userQuestions = this.currentUser.questionsAnswered;
    let questionChosen = false;
    let questionFound = false;
    console.log(possibleQuestion);
    if(possibleQuestion){
      if(userQuestions){
        for(let i = 0; i < userQuestions.length; i++){
          if (possibleQuestion.text === userQuestions[i][0]){
            console.log("question previously asked");
            questionFound = true;
            let chooseQuestion = userQuestions[i][1];
            let randomizer = Math.floor(4 * Math.random());
            console.log("Chosen Question Weight:" + chooseQuestion);
            console.log("Randomizer Weight:" + randomizer);
            if(randomizer <= chooseQuestion){
              console.log("question chosen");
              questionChosen = true;
            } else {
              console.log("question not chosen");
            }
          }
        }
      }
      if(questionChosen === true) {
        this.selectedQuestion = possibleQuestion;
      } else if(questionFound === false) {
        console.log("user has not previously answered this q");
        this.selectedQuestion = possibleQuestion;
      } else {
        console.log("re-randomizing question");
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
    console.log(value);
    this.randomQuestion();
  }

  getUser(){
  }

  addQuestionToUser(responseValue)
  {
    let userQuestions = this.currentUser.questionsAnswered;
    let questionFound = false;
    let weight = 2;
    if(userQuestions){
      console.log(this.selectedQuestion.text);
      for(let i = 0; i < userQuestions.length; i++){
        if(userQuestions[i][0] === this.selectedQuestion.text){
          console.log("previously answered question found at" + i);
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
      console.log("Question not previously answered.");
      if(this.currentUser){
        console.log(this.currentUser);
        this.currentUser.questionsAnswered.push([this.selectedQuestion.text, weight]);
        this.userService.addQuestion(this.currentUser);
      }
    };
  }

}
