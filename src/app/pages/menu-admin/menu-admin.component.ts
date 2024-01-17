import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  user: any;
  loading: boolean = false;
  animationSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.animationSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.loggedUser;

    this.animationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }

  signout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
