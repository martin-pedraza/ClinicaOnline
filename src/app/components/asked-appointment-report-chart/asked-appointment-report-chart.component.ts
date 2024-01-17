import * as XLSX from 'xlsx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-asked-appointment-report-chart',
  templateUrl: './asked-appointment-report-chart.component.html',
  styleUrls: ['./asked-appointment-report-chart.component.css'],
})
export class AskedAppointmentReportChartComponent implements OnInit, OnDestroy {
  appointments: any[] = [];
  subscription: Subscription | undefined;
  data: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.subscription = this.appointmentService
      .getAppointmentList()
      .subscribe((list) => {
        this.appointments = list;

        const specialtyCounts = this.countAppointmentsBySpecialist();
        this.data = this.convertObjectToArray(specialtyCounts);
        this.renderChart(specialtyCounts);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private countAppointmentsBySpecialist(): { [specialist: string]: number } {
    const counts: { [specialist: string]: number } = {};

    this.appointments.forEach((appointment) => {
      if (appointment.status == 'accepted' || appointment.status == 'done') {
        const specialist = appointment.specialistName;
        const week = this.checkWeek(appointment.day);
        const defaultDate = this.checkDateByWeek(
          week,
          this.getYearFromDate(appointment.day)
        );
        const key = `${specialist}-${defaultDate}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return counts;
  }

  private checkWeek(dateString: string): number {
    const date: any = new Date(dateString);
    const dayNumber = date.getDay() || 7;
    date.setDate(date.getDate() + (4 - dayNumber));
    const firstDay: any = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date - firstDay) / 86400000 + 1) / 7);
    return weekNumber;
  }

  private getYearFromDate(dateString: string): number {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }

  private checkDateByWeek(week: number, year: number): string {
    const startDate = new Date(year, 0, 1);
    const dayOffset = startDate.getDay();
    const startDateOfWeek = new Date(startDate);
    startDateOfWeek.setDate(startDate.getDate() - dayOffset + 1);
    const targetDate = new Date(startDateOfWeek);
    targetDate.setDate(targetDate.getDate() + 7 * (week - 1));

    const day = targetDate.getDate().toString().padStart(2, '0');
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = targetDate.getFullYear();

    return `${day}/${month}/${formattedYear}`;
  }

  private renderChart(data: { [specialist: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      const chart = new Chart(ctx, {
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

      ctx.onclick = (event: any) => this.handleChartClick(event, chart);
    }
  }

  private convertObjectToArray(obj: {
    [key: string]: number;
  }): { especialista_semana: string; turnos: number }[] {
    return Object.entries(obj).map(([especialista_semana, turnos]) => ({
      especialista_semana,
      turnos,
    }));
  }

  downloadReport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, 'appointmentBySpecialistInWeek.xlsx');
  }

  handleChartClick(event: MouseEvent, chart: Chart) {
    if (chart && chart.data && chart.data.labels) {
      const activePoints = chart.getElementsAtEventForMode(
        event,
        'index',
        { intersect: true },
        false
      );

      if (activePoints.length > 0) {
        const clickedIndex = activePoints[0].index;
        const specialist = chart.data.labels[clickedIndex] as string;
        const turnos = chart.data.datasets[0].data[clickedIndex] as number;
        const fecha = this.data.find(
          (item: any) => item.especialista_semana === specialist
        ).especialista_semana as string;

        this.downloadExcel(specialist.split('-')[0], fecha.split('-')[1], turnos);
      }
    }
  }

  downloadExcel(specialist: string, semana: string, turnos: number) {
    const dataToDownload = [{ especialista: specialist, semana, turnos }];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToDownload);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, `appointment_${specialist}_${semana}.xlsx`);
  }
}
