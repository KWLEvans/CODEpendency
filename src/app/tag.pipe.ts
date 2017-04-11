import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {

  transform(input: any[], filter: string) {
    if (input) {
      let output: any[] = [];
      input.forEach(question => {
        if (question.tags.includes(filter)) {
          output.push(question);
        }
      });
      return output;
    }
  }

}
