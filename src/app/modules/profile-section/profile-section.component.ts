import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css'],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ transform: 'translateY(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ProfileSectionComponent implements OnInit, OnDestroy {
  selectedOption: string = 'profile';
  loading = false;
  animationSubscription: Subscription | undefined;

  constructor(private location: Location, private router: Router) {}

  ngOnDestroy(): void {
    this.animationSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.animationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  changeOption(option: string) {
    this.selectedOption = option;
  }
}
