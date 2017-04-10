import { Answer } from './answer.model';

export class Question {
  constructor(public text: string, public author: string, public deck: string, public tags: string[], public answers: Answer[], public authorId: string = null) {}
}
