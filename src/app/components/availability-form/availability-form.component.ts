import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Availability } from 'src/app/models/availability.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { AvailabilityService } from 'src/app/services/availability.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.css'],
})
export class AvailabilityFormComponent implements OnInit {
  @Output() optionEvent = new EventEmitter<string>();
  user: any;
  spinner: boolean = false;
  form!: FormGroup;
  days: string[] = [];

  constructor(
    private authService: AuthService,
    private availabilityService: AvailabilityService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.assigForm();
  }

  changeOption(option: string) {
    this.optionEvent.emit(option);
  }

  assigForm() {
    this.form = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', []),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      day: new FormControl('', [Validators.required]),
      interval: new FormControl('', [Validators.required, Validators.min(0)]),
      specialty: new FormControl('', [Validators.required]),
      appointment: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  get startDate() {
    return this.form.get('startDate');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get startTime() {
    return this.form.get('startTime');
  }
  get endTime() {
    return this.form.get('endTime');
  }
  get day() {
    return this.form.get('day');
  }
  get interval() {
    return this.form.get('interval');
  }
  get specialty() {
    return this.form.get('specialty');
  }
  get appointment() {
    return this.form.get('appointment');
  }

  addDay(day: string) {
    if (this.days.includes(day)) {
      this.days.splice(this.days.indexOf(day), 1);
    } else {
      this.days.push(day);
    }
  }

  sentForm() {
    this.spinner = true;
    let newAvailability: Availability = this.constructObjet();
    this.availabilityService.saveAvailability(newAvailability).then((a) => {
      this.appointmentService
        .generateAppointmentByAvailability(
          newAvailability,
          this.user.dni,
          this.user.firstname + ' ' + this.user.lastname,
          this.form.value.specialty,
          a.id
        )
        .then(() => {
          Swal.fire({
            title: 'Disponibilidad guardada',
            icon: 'success',
            heightAuto: false,
          });
          this.form.reset();
          this.spinner = false;
        });
    });
  }

  constructObjet() {
    const f = this.form.value;

    return {
      specialist: this.user.dni,
      specialty: f.specialty,
      startDate: f.startDate,
      endDate: f.endDate,
      startTime: f.startTime,
      endTime: f.endTime,
      day: this.days,
      interval: f.interval,
      appointmentDuration: f.appointment,
    };
  }
}
