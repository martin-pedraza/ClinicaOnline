import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './date.pipe';
import { TimePipe } from './time.pipe';
import { NamePipe } from './name.pipe';

@NgModule({
  declarations: [DatePipe, TimePipe, NamePipe],
  imports: [CommonModule],
  exports: [DatePipe, TimePipe, NamePipe],
})
export class PipesModule {}
