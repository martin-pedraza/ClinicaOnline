import { Component, OnDestroy, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialistService } from 'src/app/services/specialist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  patientList: any[] = [];
  patientListSuscription: Subscription | undefined;
  specialistList: any[] = [];
  specialistListSubscription: Subscription | undefined;
  appointmentList: any[] = [];
  appointmentListSubscription: Subscription | undefined;

  constructor(
    private patientService: PatientService,
    private specialistService: SpecialistService,
    private userService: UserService,
    private appointmentService: AppointmentService
  ) {}

  ngOnDestroy(): void {
    this.patientListSuscription?.unsubscribe();
    this.specialistListSubscription?.unsubscribe();
    this.appointmentListSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.patientListSuscription = this.patientService
      .getPatientList()
      .subscribe((list) => {
        this.patientList = this.userService.orderUserList(list);
      });

    this.specialistListSubscription = this.specialistService
      .getSpecialistList()
      .subscribe((list) => {
        this.specialistList = this.userService.orderUserList(list);
      });
  }

  enableAccount(option: boolean, id: string) {
    this.specialistService.changeSpecialistStatus(option, id);
  }

  downloadAppointment(dni: string, isPatient: boolean) {
    if (isPatient) {
      this.appointmentListSubscription = this.appointmentService
        .getAppointmentListByDniPatient(dni)
        .subscribe((list) => {
          this.appointmentList = [];
          for (let index = 0; index < list.length; index++) {
            const element = list[index];
            this.appointmentList.push(element);
            delete this.appointmentList[this.appointmentList.length - 1]
              .atention;
            delete this.appointmentList[this.appointmentList.length - 1].survey;
          }

          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.appointmentList
          );
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Historial');
          XLSX.writeFile(wb, 'appointments.xlsx');

          if (this.appointmentListSubscription) {
            this.appointmentListSubscription.unsubscribe();
          }
        });
    } else {
      this.appointmentListSubscription = this.appointmentService
        .getAppointmentListByDniSpecialist(dni)
        .subscribe((list) => {
          this.appointmentList = [];
          for (let index = 0; index < list.length; index++) {
            const element = list[index];
            this.appointmentList.push(element);
            delete this.appointmentList[this.appointmentList.length - 1]
              .atention;
            delete this.appointmentList[this.appointmentList.length - 1].survey;
          }

          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.appointmentList
          );
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Historial');
          XLSX.writeFile(wb, 'appointments.xlsx');

          if (this.appointmentListSubscription) {
            this.appointmentListSubscription.unsubscribe();
          }
        });
    }
  }
}
