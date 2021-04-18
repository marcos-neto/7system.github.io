import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
    // you can override any of the methods defined in the parent class

    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'LLLL, y', locale);
    }

    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        let formattedDate = formatDate(date, 'EEE', locale);

        return this.firstLatterUpperCase(formattedDate);
    }

    public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
        let formattedDate = formatDate(date, 'EEE', locale);

        return this.firstLatterUpperCase(formattedDate);
    }

    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'HH:mm', locale);
    }

    public dayViewTitle({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'EEEE, dd MMMM, y', locale);
    }

    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'HH:mm', locale);
    }

    public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
        let formattedDate = formatDate(date, 'LLL yyyy', locale);

        return this.firstLatterUpperCase(formattedDate);
    }


    private firstLatterUpperCase(term) {
        let arrayLetters = term.split('');
        arrayLetters[0] = arrayLetters[0].toUpperCase();

        return arrayLetters.join('');
    }
}