import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';



@NgModule({
  declarations: [MenuLateralComponent, ToolbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    AvatarModule
  ],
  exports: [MenuLateralComponent, ToolbarComponent]
})
export class ComponentesModule { }
