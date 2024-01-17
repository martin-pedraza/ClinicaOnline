import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-specialty-report-chart',
  templateUrl: './specialty-report-chart.component.html',
  styleUrls: ['./specialty-report-chart.component.css'],
})
export class SpecialtyReportChartComponent implements OnInit, OnDestroy {
  appointments: any[] = [];
  subscription: Subscription | undefined;
  data: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.subscription = this.appointmentService
      .getAppointmentList()
      .subscribe((list) => {
        this.appointments = list;

        const specialtyCounts = this.countAppointmentsBySpecialty();
        this.data = this.convertObjectToArray(specialtyCounts);
        this.renderChart(specialtyCounts);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  countAppointmentsBySpecialty(): { [specialty: string]: number } {
    const counts: { [specialty: string]: number } = {};

    this.appointments.forEach((appointment) => {
      const specialty = appointment.specialty || 'Otra';
      counts[specialty] = (counts[specialty] || 0) + 1;
    });

    return counts;
  }

  renderChart(data: { [specialty: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
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
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  private convertObjectToArray(obj: {
    [key: string]: number;
  }): { especialidad: string; turnos: number }[] {
    return Object.entries(obj).map(([especialidad, turnos]) => ({
      especialidad,
      turnos,
    }));
  }

  downloadReport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, 'appointmentBySpecialty.xlsx');
  }
}
