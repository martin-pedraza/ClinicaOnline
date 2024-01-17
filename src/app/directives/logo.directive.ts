import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appLogo]',
})
export class LogoDirective implements AfterViewInit {
  @Input() size: string = '150px';
  private imagePath: string = 'assets/clinic-icon.png';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setImagePath();
    this.setSize();
  }

  private setSize() {
    this.renderer.setStyle(this.el.nativeElement, 'width', this.size);
    this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
  }

  private setImagePath() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.imagePath);
  }
}
