import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        let arrayName = value.split(' ');
        return arrayName[0];
    }

}