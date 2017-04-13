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

  saveQuestion(question: Question) {
    this.questions.push(question);
  }

  getQuestionById(questionId: string) {
    return this.angularFire.database.object('questions/' + questionId);
  }

  updateQuestion(questionUpdater) {
    let questionToUpdate = this.getQuestionById(questionUpdater.$key);
    questionToUpdate.update({
      text: questionUpdater.text,
      tags: questionUpdater.tags,
      answer: questionUpdater.answer
    });
  }

  deleteQuestion(questionId: string) {
    this.getQuestionById(questionId).remove();
  }

  purgeByDeckId(deckId: string) {
    this.getQuestions().subscribe(questionArray => {
      questionArray.forEach(question => {
        if (question.deck === deckId) {
          this.deleteQuestion(question.$key);
        }
      });
    });
  }
}
