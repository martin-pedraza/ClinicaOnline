import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function specialtyValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const selectedValue = formGroup.get('specialty');
    const errorAnswer = { noSelected: '(Este campo es obligatorio)' };

    if (selectedValue?.value == '') {
      selectedValue?.setErrors(errorAnswer);
      return errorAnswer;
    } else {
      selectedValue?.setErrors(null);
      return null;
    }
  };
}
