import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appEmoticon]',
})
export class EmoticonDirective implements OnInit {
  private emoji: string = '🙍‍♂️';

  private setEmoji() {
    switch (this.authService.loggedUser.profile) {
      case 'patient':
        this.emoji = '🙍‍♂️';
        break;
      case 'specialist':
        this.emoji = '👨‍⚕️';
        break;
      default:
        this.emoji = '👨‍⚖️';
        break;
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setEmoticon();
  }

  private setEmoticon() {
    this.setEmoji();
    const emojiElement = this.renderer.createElement('span');
    this.renderer.setProperty(emojiElement, 'innerHTML', this.emoji);
    this.renderer.appendChild(this.el.nativeElement, emojiElement);
  }
}
