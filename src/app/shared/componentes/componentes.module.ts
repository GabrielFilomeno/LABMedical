import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [MenuLateralComponent, ToolbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
  ],
  exports: [MenuLateralComponent, ToolbarComponent]
})
export class ComponentesModule { }
