import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'upperFirstLetter'
})
export class UpperFirstLetter implements PipeTransform {

    transform(value: any, ...args: any[]) {

        let words = value.split(' ');

        for (var a = 0; a < words.length; a++) {
            var w = words[a];

            var firstLetter = w[0];
            w = firstLetter.toUpperCase() + w.slice(1);

            words[a] = w;
        }

        return words.join(' ')

    }

}