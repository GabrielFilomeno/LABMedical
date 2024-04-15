import { Component } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  sidebarMobileVisible: boolean = false;
  sidebarVisible: boolean = true;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  
  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }
}
