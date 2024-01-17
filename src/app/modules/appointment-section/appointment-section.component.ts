import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrls: ['./appointment-section.component.css'],
})
export class AppointmentSectionComponent implements OnInit, OnDestroy {
  filteredList: any[] = [];
  filteredListSubscription: Subscription | undefined;
  appointmentList: any[] = [];
  appointmentListSubscription: Subscription | undefined;
  optionList: any[] = [];
  formShown: string = '';
  textAreaValue: string = '';
  spinner: boolean = false;
  appointmentSelected: any;
  appointmentId: string = '';

  constructor(
    private location: Location,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentListSubscription = this.appointmentService
      .getAppointmentListWithAnyPatient()
      .subscribe((list) => {
        this.appointmentList =
          this.appointmentService.orderAppointmentList(list);
        this.createOptionList();
      });
  }

  createOptionList() {
    this.optionList = [];
    for (let index = 0; index < this.appointmentList.length; index++) {
      const element = this.appointmentList[index];
      if (!this.optionList.includes(element['specialistName'])) {
        this.optionList.push(element['specialistName']);
      }

      if (!this.optionList.includes(element['specialty'])) {
        this.optionList.push(element['specialty']);
      }
    }
  }

  ngOnDestroy(): void {
    this.appointmentListSubscription?.unsubscribe();
    this.filteredListSubscription?.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  changeFilter(event: any) {
    if (event.target.value != '') {
      if (event.target.value.split(' ').length == 1) {
        this.filteredListSubscription = this.appointmentService
          .getAppointmentListBySpecialty(event.target.value)
          .subscribe((list) => {
            this.filteredList =
              this.appointmentService.orderAppointmentList(list);
          });
        return;
      }

      if (event.target.value.split(' ').length > 1) {
        this.filteredListSubscription = this.appointmentService
          .getAppointmentListByNamePatient(event.target.value)
          .subscribe((list) => {
            this.filteredList =
              this.appointmentService.orderAppointmentList(list);
          });
      }
    }
  }

  changeForm(form: string, appointment: any, comment: string) {
    this.textAreaValue = '';
    if (comment) {
      this.textAreaValue = comment;
    }
    this.formShown = form;
    this.appointmentSelected = appointment;
    this.appointmentId = appointment.id;
  }
  
  cancelAppointment() {
    this.spinner = true;
    this.appointmentService
      .createAppointmentCauseCancel(this.appointmentSelected)
      .then(() => {
        this.appointmentService.cancelAppointment(
          this.appointmentId,
          this.textAreaValue
        );
      })
      .then(() => {
        Swal.fire({
          title: 'Turno cancelado',
          icon: 'info',
          heightAuto: false,
        });
        this.spinner = false;
      });
  }
}
