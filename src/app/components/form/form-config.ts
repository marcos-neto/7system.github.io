import { FormGroup } from "@angular/forms";

export interface FormConfig {
    formFields: FormField[];
    formGroup: FormGroup;
    submitButtonLabel: string;
    captcha?: FormCaptcha
}

export interface FormField {
    formControlName: string;
    inputType: string;
    placeholder: string;
    autoComplete: boolean;
    displaysError: boolean;
    iconName?: string;
    showContent?: boolean;
    hint?: HintField;
}

export interface FormCaptcha {
    formControlName: string;
}

export interface HintField {
    text: string;
    routerLink?: string;
}