import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menuLateral/menu-lateral/menu-lateral.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [MenuLateralComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule
  ],
  exports: [MenuLateralComponent]
})
export class ComponentesModule { }
