import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundDirective } from './background.directive';
import { LogoDirective } from './logo.directive';
import { EmoticonDirective } from './emoticon.directive';

@NgModule({
  declarations: [BackgroundDirective, LogoDirective, EmoticonDirective],
  imports: [CommonModule],
  exports: [BackgroundDirective, LogoDirective, EmoticonDirective],
})
export class DirectivesModule {}
