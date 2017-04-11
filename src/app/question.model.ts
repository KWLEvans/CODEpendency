export class Question {
  constructor(public text: string, public deck: string, public tags: string[], public answer: string, public authorId: string = null) {}
}
