import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { adminExistValidator } from 'src/app/validators/adminExist.validator';
import { emailExistValidator } from 'src/app/validators/emailExist.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register-form',
  templateUrl: './admin-register-form.component.html',
  styleUrls: ['./admin-register-form.component.css'],
})
export class AdminRegisterFormComponent implements OnInit {
  form!: FormGroup;
  spinner: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.assigForm();
  }

  assigForm() {
    this.form = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(125),
      ]),
      dni: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
        [adminExistValidator(this.adminService)]
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [emailExistValidator(this.userService)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      image: new FormControl('', Validators.required),
    });
  }

  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get age() {
    return this.form.get('age');
  }
  get dni() {
    return this.form.get('dni');
  }
  get password() {
    return this.form.get('password');
  }
  get email() {
    return this.form.get('email');
  }
  get image() {
    return this.form.get('image');
  }

  onFileSelected(event: any) {
    const fileOne: File = event.target.files[0];
    if (fileOne) {
      this.selectedFile = fileOne;
    }
  }

  sentForm() {
    this.spinner = true;
    let newAdmin: Admin;
    
    this.constructObjet().then((a) => {
      newAdmin = a;
      this.adminService.saveAdmin(newAdmin).then(() => {
        Swal.fire({
          title: 'Administrador creado',
          icon: 'success',
          heightAuto: false,
        });
        this.form.reset();
        this.spinner = false;
      });
    });
  }

  async constructObjet() {
    const f = this.form.value;

    let image = this.selectedFile
    ? await this.saveImage(f, this.selectedFile)
    : '';

    return {
      firstname: f.firstname,
      lastname: f.lastname,
      age: f.age,
      dni: f.dni,
      email: f.email,
      password: f.password,
      image: image,
      profile: 'admin',
    };
  }

  saveImage(form: any, image: File) {
    return this.imageService.uploadImage(
      image,
      `admin_images/A-${form.lastname}-${form.firstname}-admin`
    );
  }
}
