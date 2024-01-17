import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { AvailabilityService } from 'src/app/services/availability.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-availability',
  templateUrl: './user-availability.component.html',
  styleUrls: ['./user-availability.component.css'],
})
export class UserAvailabilityComponent implements OnInit, OnDestroy {
  @Output() optionEvent = new EventEmitter<string>();
  availabilityList: any[] = [];
  availabilityListSubscription: Subscription | undefined;
  user: any;

  constructor(
    private authService: AuthService,
    private availabilityService: AvailabilityService,
    private appointmentService: AppointmentService
  ) {}

  ngOnDestroy(): void {
    this.availabilityListSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.availabilityListSubscription = this.availabilityService
      .getAvailabilityByDni(this.user.dni)
      .subscribe((list) => {
        this.availabilityList = list;
      });
  }

  changeOption(option: string) {
    this.optionEvent.emit(option);
  }

  cancelAvailability(id: string) {
    this.appointmentService.deleteAppointmentByAvailability(id);
    this.availabilityService.deleteAvailability(id);
    Swal.fire({
      title: 'Disponibilidad cancelada',
      icon: 'success',
      heightAuto: false,
    });
  }
}
