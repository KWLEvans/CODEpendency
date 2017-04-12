import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {
  @Input() question;
  @Output() answeredSender = new EventEmitter;

  flippedCard: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  rightAnswer() {
    this.answeredSender.emit(true);
  }

  wrongAnswer() {
    this.answeredSender.emit(false);
  }

}
