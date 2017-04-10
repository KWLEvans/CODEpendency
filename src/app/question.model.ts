export class Question {
  constructor(public text: string, public author: string, public deck: string, public tags: string[], public answers: string[], public authorId: string = null) {}
}
