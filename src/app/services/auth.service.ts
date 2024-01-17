import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userList: any[] = [];
  loggedUser: any;

  constructor(
    private userService: UserService,
    private logService: LogService
  ) {
    this.loadUserLists();
  }

  private loadUserLists() {
    this.userService.getUserList().subscribe((list) => {
      this.userList = list;
    });
  }

  login(form: any): boolean {
    for (let index = 0; index < this.userList.length; index++) {
      const user = this.userList[index];
      if (
        user['email'] === form['email'] &&
        user['password'] === form['password']
      ) {
        this.loggedUser = user;
        this.logService.saveLog(form['email']);
        return true;
      }
    }
    return false;
  }

  logout() {
    this.loggedUser = null;
  }
}
