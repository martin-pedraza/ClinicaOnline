import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  currentUser: any = {};
  userListSubscription: Subscription | undefined;
  p1: any;
  p2: any;
  p3: any;
  s1: any;
  s2: any;
  a1: any;

  constructor(private router: Router, private userService: UserService) {}
  ngOnDestroy(): void {
    this.userListSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userListSubscription = this.userService
      .getUserList()
      .subscribe((list) => {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          switch (element['dni']) {
            case '37589983':
              this.s2 = element;
              break;
            case '45989103':
              this.p2 = element;
              break;
            case '34998575':
              this.a1 = element;
              break;
            case '29556439':
              this.s1 = element;
              break;
            case '40049121':
              this.p3 = element;
              break;
            case '35844987':
              this.p1 = element;
              break;
          }
        }
      });
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  selectUser(user: any) {
    this.currentUser = user;
  }
}
