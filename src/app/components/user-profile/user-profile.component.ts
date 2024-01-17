import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: any;
  @Output() optionEvent = new EventEmitter<string>();
  list: any = null;
  listSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.loggedUser;

    if (this.user.profile == 'patient') {
      this.listSubscription = this.appointmentService
        .getAppointmentListByDniPatient(this.user.dni)
        .subscribe((appointments) => {
          this.list = {};
          for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            if (!this.list.hasOwnProperty(element['specialty'])) {
              this.list[element['specialty']] = Array();
            }
            this.list[element['specialty']].push(element);
            delete this.list[element['specialty']][
              this.list[element['specialty']].length - 1
            ].survey;
            delete this.list[element['specialty']][
              this.list[element['specialty']].length - 1
            ].atention;
          }
        });
    } else if (this.user.profile == 'specialist') {
      this.listSubscription = this.appointmentService
        .getAppointmentListByDniSpecialist(this.user.dni)
        .subscribe((appointments) => {
          this.list = {};
          for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            if (!this.list.hasOwnProperty(element['specialty'])) {
              this.list[element['specialty']] = [];
            }
            this.list[element['specialty']].push(element);
            delete this.list[element['specialty']][
              this.list[element['specialty']].length - 1
            ].survey;
            delete this.list[element['specialty']][
              this.list[element['specialty']].length - 1
            ].atention;
          }
        });
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  changeOption(option: string) {
    this.optionEvent.emit(option);
  }

  get firstImage() {
    if (this.user.profile == 'patient') {
      return this.user.firstImage;
    }
    return this.user.image;
  }

  get secondImage() {
    if (this.user.profile == 'patient') {
      return this.user.secondImage;
    }
    return '';
  }

  get other() {
    switch (this.user.profile) {
      case 'patient':
        return 'Obra social: ' + this.user.healthcare;
      case 'specialist':
        return 'Especialidad: ' + this.user.specialty;
      default:
        return '';
    }
  }

  changeSelect(event: any) {
    const option = event.target.value;

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.list[option]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, option);
    XLSX.writeFile(wb, option + '.xlsx');
  }
}
