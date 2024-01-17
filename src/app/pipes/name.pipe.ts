import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(name: string): string {
    const words = name.split(' ');

    const formattedWords = words.map((word) => {
      return word.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    });

    return formattedWords.join(' ');
  }
}
