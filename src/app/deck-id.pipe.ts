import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deckId'
})
export class DeckIdPipe implements PipeTransform {

  transform(input, deckId: string) {
    if (input) {
      let output: any[] = [];
      input.forEach(question => {
        if (question.deck === deckId) {
          output.push(question);
        }
      });
      return output;
    }
  }

}
