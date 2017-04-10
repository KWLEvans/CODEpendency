import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
  questions: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.questions = this.angularFire.database.list('questions');
  }

  getQuestions() {
    return this.questions;
  }

}
