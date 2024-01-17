import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css'],
})
export class AppointmentTableComponent implements OnInit, OnDestroy {
  @Input() user!: any;
  appointmentList: any[] = [];
  appointmentListSubscription: Subscription | undefined;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    console.log(this.user)
    if (this.user.profile == 'patient') {
      this.appointmentListSubscription = this.appointmentService
        .getAppointmentListByDniPatient(this.user.dni)
        .subscribe((list) => {
          this.appointmentList = this.appointmentService.orderAppointmentList(
            this.appointmentService.filterByNumber(list, 3)
          );
        });
    } else {
      this.appointmentListSubscription = this.appointmentService
        .getAppointmentListByDniSpecialist(this.user.dni)
        .subscribe((list) => {
          this.appointmentList = this.appointmentService.orderAppointmentList(
            this.appointmentService.filterByNumber(list, 3)
          );
        });
    }
  }

  ngOnDestroy(): void {
    this.appointmentListSubscription?.unsubscribe();
  }
}
