import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Question } from './../question.model';
import { QuestionService } from './../question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ QuestionService ]
})
export class HomeComponent implements OnInit {
  questions: FirebaseListObservable<any[]>;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

}
