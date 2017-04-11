import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User } from './../user.model';
import { Question } from './../question.model';
import { QuestionService } from './../question.service';
import { FlashCardComponent } from './../flash-card/flash-card.component';
import { TagPipe } from './../tag.pipe';
import { AuthService } from './../providers/auth.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers: [ QuestionService, AuthService, UserService ]
})
export class StudyComponent implements OnInit {
  filter: string;
  questions: Question[] = [];
  selectedQuestion: Question;
  user_displayName;
  isLoggedIn;

  constructor(private route: ActivatedRoute, private location: Location, private questionService: QuestionService, private authService: AuthService, private userService: UserService) {
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
    this.route.params.forEach(urlParameters => {
      this.filter = urlParameters['filter'];
      console.log(typeof this.filter);
    });
    this.questionService.getQuestions().subscribe(questionArray => {
      questionArray.forEach(question => {
        let newQuestion = new Question(question.text, question.deck, question.tags, question.answer, question.authorId);
        if (newQuestion.tags.includes(this.filter)) {
          this.questions.push(newQuestion);
        }
      });
    });
  }

  randomQuestion() {
    let randomIndex = Math.floor(this.questions.length * Math.random());
    this.selectedQuestion = this.questions[randomIndex];
  }

  answerQuestion(value: boolean) {
    if(this.user_displayName){
      let currentUser = this.userService.getUserById(user_displayName);
      console.log(currentUser);
      if(currentUser){
        this.userService.addQuestion(currentUser, selectedQuestion, value);
      } else {
        let newUser = new User(this.user_displayName);
        this.userService.saveUser(newUser);
        this.userService.addQuestion(currentUser, selectedQuestion, value);
      }
    }

    // This is where weighting and sorting answers can happen in the future
    console.log(value);
    this.randomQuestion();
  }

}
