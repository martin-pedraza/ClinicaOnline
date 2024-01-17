import { Component, OnDestroy, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-report-table',
  templateUrl: './log-report-table.component.html',
  styleUrls: ['./log-report-table.component.css'],
})
export class LogReportTableComponent implements OnInit, OnDestroy {
  logList: any[] = [];
  logListSubscription: Subscription | undefined;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logListSubscription = this.logService
      .getLogList()
      .subscribe((list) => {
        this.logList = this.logService.orderLogList(list);
      });
  }

  ngOnDestroy(): void {
    this.logListSubscription?.unsubscribe();
  }

  downloadReport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, 'logs.xlsx');
  }
}
