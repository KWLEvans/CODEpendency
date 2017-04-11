import { Component, OnInit, Input } from '@angular/core';

import { Question } from './../question.model';
import { QuestionService } from './../question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [ QuestionService ]
})
export class QuestionFormComponent implements OnInit {
  @Input() deckId: string;
  @Input() questionToEdit;
  question;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
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
    if (this.questionToEdit) {
      this.questionService.updateQuestion(question);
    } else {
      question.deck = this.deckId;
      this.questionService.saveQuestion(question);
    }
    this.question = new Question("", "", [], "");
  }

}
