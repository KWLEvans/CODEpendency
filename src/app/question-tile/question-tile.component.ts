import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-tile',
  templateUrl: './question-tile.component.html',
  styleUrls: ['./question-tile.component.css']
})
export class QuestionTileComponent implements OnInit {
  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
