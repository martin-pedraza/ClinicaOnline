import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnChanges {
  @Input() autofill!: any;
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['autofill'] && this.autofill) {
      this.form = new FormGroup({
        email: new FormControl(this.autofill.email, [
          Validators.email,
          Validators.required,
        ]),
        password: new FormControl(this.autofill.password, [
          Validators.required,
        ]),
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  sentForm() {
    if (this.authService.login(this.form.value)) {
      this.redirectProfile();
      return;
    }
    Swal.fire({
      title: 'Las credenciales no son correctas',
      icon: 'warning',
      heightAuto: false,
    });
  }

  redirectProfile() {
    const user = this.authService.loggedUser;

    switch (user['profile']) {
      case 'admin':
        this.router.navigateByUrl('/menu-admin');
        break;
      case 'specialist':
        this.showStatusMessage();
        break;
      case 'patient':
        this.router.navigateByUrl('/menu-patient');
        break;
    }
  }

  showStatusMessage() {
    const user = this.authService.loggedUser;

    switch (user['status']) {
      case 'pending':
        Swal.fire({
          title: 'Su cuenta está pendiente de confirmación',
          icon: 'info',
          heightAuto: false,
        });
        break;
      case 'enabled':
        this.router.navigateByUrl('/menu-specialist');
        break;
      case 'disabled':
        Swal.fire({
          title: 'Su cuenta ha sido deshabilitada',
          icon: 'error',
          heightAuto: false,
        });
        break;
    }
  }
}
