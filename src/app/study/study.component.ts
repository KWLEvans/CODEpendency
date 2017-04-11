import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from './../question.model';
import { QuestionService } from './../question.service';
import { FlashCardComponent } from './../flash-card/flash-card.component';
import { TagPipe } from './../tag.pipe';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  providers: [ QuestionService ]
})
export class StudyComponent implements OnInit {
  filter: string;
  questions: Question[] = [];
  selectedQuestion: Question;

  constructor(private route: ActivatedRoute, private location: Location, private questionService: QuestionService) { }

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
    // This is where weighting and sorting answers can happen in the future
    console.log(value);
    this.randomQuestion();
  }

}
