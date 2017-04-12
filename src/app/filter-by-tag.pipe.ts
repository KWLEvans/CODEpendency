import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterByTag'
})
export class FilterByTagPipe implements PipeTransform {

  transform(input, ids: string[]) {
    if (input) {
      let output = [];
      input.forEach(deck => {
        if (ids.includes(deck.$key) && !output.includes(deck)) {
          output.push(deck);
        }
      });
      return output;
    }
  }

}
