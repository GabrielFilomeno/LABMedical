import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menuLateral/menu-lateral/menu-lateral.component';



@NgModule({
  declarations: [MenuLateralComponent],
  imports: [
    CommonModule,
  ],
  exports: [MenuLateralComponent]
})
export class ComponentesModule { }
