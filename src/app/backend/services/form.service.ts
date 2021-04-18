import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor() {

    }

    getErroMessage(formControl: FormControl) {

        if (formControl.hasError('required')) {
            return 'Este campo é obrigatório';
        }

        if (formControl.hasError('email')) {
            return 'Email Invalido';
        }

        if (formControl.hasError('minlength')) {
            return `Digite pelo menos ${formControl.errors['minlength'].requiredLength}  caracteres`;
        }

        if (formControl.hasError('passwordsNotMatch')) {
            return 'As senhas não coincidem';
        }

        return '';
    }
}