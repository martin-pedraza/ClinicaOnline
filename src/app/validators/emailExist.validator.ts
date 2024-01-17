import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export function emailExistValidator(service: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const email = control.value;
    const errorAnswer = { emailExist: '(Ya existe)' };

    return service.getUserList().pipe(
      map((list) => {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];

          if (element['email'] == email) {
            control.setErrors(errorAnswer);
            return errorAnswer;
          }
        }
        return null;
      })
    );
  };
}
