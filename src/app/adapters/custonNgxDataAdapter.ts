import { NativeDateAdapter } from '@angular/material/core';
import { NgxMatDateAdapter } from "@angular-material-components/datetime-picker";
import { Injectable } from "@angular/core";
import { dateInputsHaveChanged } from "@angular/material/datepicker/datepicker-input-base";

@Injectable()
export class CustonNgxDataAdapter extends NativeDateAdapter {
    getHour(date: Date): number {
        return date.getHours();
    }
    setHour(date: Date, value: number): void {
        date.setHours(value);
    }
}