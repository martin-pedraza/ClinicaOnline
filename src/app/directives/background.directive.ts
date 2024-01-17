import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]',
})
export class BackgroundDirective implements OnInit {
  @Input() backgroundColor: string = 'white';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setBackgroundColor();
  }

  private setBackgroundColor() {
    let color: string;

    switch (this.backgroundColor) {
      case 'white':
        color = '#f4f1de';
        break;
      case 'red':
        color = '#c70904';
        break;
      case 'grey':
        color = '#3d405b';
        break;
      default:
        color = 'white';
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
