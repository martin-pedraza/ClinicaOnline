import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function healthcareValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const selectedValue = formGroup.get('healthcare');
    const errorAnswer = { noSelected: '(Este campo es obligatorio)' };

    if (selectedValue?.value == "") {
      selectedValue?.setErrors(errorAnswer);
      return errorAnswer;
    } else {
      selectedValue?.setErrors(null);
      return null;
    }
  };
}
