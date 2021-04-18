import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[matBadgeIcon]'
})
export class MatBadgeIconDirective {

    @Input() matBadgeIcon: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        const badge = this.el.nativeElement.querySelector('.mat-badge-content');
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.innerHTML = `<i class="material-icons" style="font-size: 20px">${this.matBadgeIcon}</i>`;
    }
}