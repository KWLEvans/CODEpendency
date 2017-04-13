import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { QuestionFormComponent } from './../question-form/question-form.component';
import { QuestionService } from './../question.service';

@Component({
  selector: 'app-question-tile',
  templateUrl: './question-tile.component.html',
  styleUrls: ['./question-tile.component.css'],
  providers: [ QuestionService ]
})
export class QuestionTileComponent implements OnInit {
  @Input() question;
  @Output() editSender = new EventEmitter();
  editMode: boolean = false;
  deleteQuestion: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  editQuestion(questionId: string) {
    this.editSender.emit(questionId);
  }

  startDeletingQuestion(question) {
    this.questionService.deleteQuestion(question.$key);
  }

}
