import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css'],
})
export class UserSectionComponent implements OnInit, OnDestroy {
  selectedMain: string = 'list';
  list: any[] = [];
  listSubscription: Subscription | undefined;

  constructor(
    private location: Location,
    private userService: UserService,
  ) {}

  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.listSubscription = this.userService
      .getUserList()
      .subscribe((users) => {
        this.list = [];
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          this.list.push({
            DNI: element['dni'],
            Apellido: element['lastname'],
            Nombre: element['firstname'],
            Edad: element['age'],
            Correo: element['email'],
            Perfil: element['profile'],
          });
        }
      });
  }

  changeMain(main: string) {
    this.selectedMain = main;
  }

  changeSelect(event: any) {
    if (event.target.value != '') {
      this.changeMain(event.target.value);
    }
  }

  goBack() {
    this.location.back();
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Details');
    XLSX.writeFile(wb, 'users.xlsx');
  }
}
