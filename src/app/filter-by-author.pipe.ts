import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAuthor'
})
export class FilterByAuthorPipe implements PipeTransform {

  transform(input, author: string) {
    if (input) {
      let output = [];
      input.forEach(deck => {
        if (deck.author === author) {
          output.push(deck);
        }
      });
      return output;
    }
  }

}
