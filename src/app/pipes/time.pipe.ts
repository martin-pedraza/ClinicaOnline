import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(time24: string): string {
    const [hours, minutes] = time24.split(':');
    const hoursNumber = parseInt(hours, 10);
    const period = hoursNumber >= 12 ? 'pm' : 'am';
    const hours12 = hoursNumber % 12 === 0 ? 12 : hoursNumber % 12;
    return `${hours12.toString().padStart(2, '0')}:${minutes.padStart(
      2,
      '0'
    )} ${period}`;
  }
}
