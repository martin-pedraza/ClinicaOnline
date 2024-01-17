import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private firebaseService: FirebaseService) {}

  getLogList() {
    return this.firebaseService.getList('log');
  }

  saveLog(email: string) {
    const log = {
      email: email,
      date: this.checkDate(),
      time: this.checkTime(),
    };
    return this.firebaseService.saveItem(log, 'log');
  }

  orderLogList(logList: any[]) {
    return logList.sort((a, b) => {
      const fistLog = new Date(a.date + 'T' + a.time);
      const secondLog = new Date(b.date + 'T' + b.time);

      if (fistLog < secondLog) {
        return -1;
      }
      if (fistLog > secondLog) {
        return 1;
      }
      return 0;
    });
  }

  private checkDate(): string {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const newDate = `${year}-${month}-${day}`;

    return newDate;
  }

  private checkTime(): string {
    const currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const actualTime = `${hours}:${minutes}:${seconds}`;
    return actualTime;
  }
}
