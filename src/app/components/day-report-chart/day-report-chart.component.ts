import { Component, OnDestroy, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-day-report-chart',
  templateUrl: './day-report-chart.component.html',
  styleUrls: ['./day-report-chart.component.css'],
})
export class DayReportChartComponent implements OnInit, OnDestroy {
  appointments: any[] = [];
  data: any;
  subscription: Subscription | undefined;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.subscription = this.appointmentService
      .getAppointmentList()
      .subscribe((list) => {
        this.appointments = list;

        const dayCounts = this.countAppointmentsByDay();
        this.data = this.convertObjectToArray(dayCounts);
        this.renderChart(dayCounts);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  countAppointmentsByDay(): { [day: string]: number } {
    const counts: { [day: string]: number } = {};

    this.appointments.forEach((appointment) => {
      const day = this.checkDay(appointment.day) || 'Otro';
      counts[day] = (counts[day] || 0) + 1;
    });

    return counts;
  }

  private checkDay(dateString: string) {
    const date = new Date(dateString);

    const dayOfWeek = date.getDay();

    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    const dayName = daysOfWeek[dayOfWeek];

    return dayName;
  }

  renderChart(data: { [day: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Turnos',
              data: Object.values(data),
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }

  private convertObjectToArray(obj: {
    [key: string]: number;
  }): { dia: string; turnos: number }[] {
    return Object.entries(obj).map(([dia, turnos]) => ({
      dia,
      turnos,
    }));
  }

  downloadReport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, 'appointmentByDay.xlsx');
  }
}
