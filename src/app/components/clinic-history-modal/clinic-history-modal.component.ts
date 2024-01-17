import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-clinic-history-modal',
  templateUrl: './clinic-history-modal.component.html',
  styleUrls: ['./clinic-history-modal.component.css'],
})
export class ClinicHistoryModalComponent implements OnInit, OnDestroy {
  @Input() user!: any;
  historialList: any[] = [];
  historialListSubscription: Subscription | undefined;

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.historialListSubscription = this.historialService
      .getHistorialListByPatientDni(this.user.dni)
      .subscribe((list) => {
        this.historialList = this.historialService.orderHistorialList(list);
      });
  }

  ngOnDestroy(): void {
    this.historialListSubscription?.unsubscribe();
  }
}
