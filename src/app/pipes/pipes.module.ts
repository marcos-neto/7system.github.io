import { FirstNamePipe } from './fisrt-name.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperFirstLetter } from './upper-first-letter.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FirstNamePipe,
    UpperFirstLetter
  ],
  exports: [
    FirstNamePipe,
    UpperFirstLetter
  ]
})
export class PipesModule { }
