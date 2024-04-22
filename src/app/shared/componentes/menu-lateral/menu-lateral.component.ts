import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';
import { VerificarLogadoService } from '../../services/verificar-logado.service';

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

  constructor (
    private router: Router,
    private verificarLogadoService: VerificarLogadoService
  ) {};

  rotaInicio() {
    this.router.navigate(['inicio']);
  };

  rotaSair() {
    if(confirm('Você tem certeza qie deseja sair?')) {
    this.verificarLogadoService.logout();
    this.router.navigate(['login']);
    } else {
      return;
    }
  };

  rotaCadastroPaciente() {
    this.router.navigate(['cadastro-paciente']);
  };

  rotaListarProntuarios() {
    this.router.navigate(['listagem-de-prontuarios']);
  };

  rotaCadastroConsulta() {
    this.router.navigate(['cadastro-consulta']);
  };

  rotaCadastroExame() {
    this.router.navigate(['cadastro-exame']);
  };
}
