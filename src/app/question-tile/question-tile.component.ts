import { Component, OnInit, Input } from '@angular/core';

import { QuestionFormComponent } from './../question-form/question-form.component';

@Component({
  selector: 'app-question-tile',
  templateUrl: './question-tile.component.html',
  styleUrls: ['./question-tile.component.css']
})
export class QuestionTileComponent implements OnInit {
  @Input() question;
  editMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
