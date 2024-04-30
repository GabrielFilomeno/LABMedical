import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-listar-prontuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './listar-prontuarios.component.html',
  styleUrl: './listar-prontuarios.component.scss'
})
export class ListarProntuariosComponent {

  pacientes: any;
  todosPacientes: any;
  procurarPaciente: any;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {};

  ngOnInit(): void {
    const listaPacientes = localStorage.getItem('listaPacientes');
    if (listaPacientes) {
      this.pacientes = JSON.parse(listaPacientes);
      this.todosPacientes = JSON.parse(listaPacientes);
    };
  };

  buscarPaciente() {
    const nomeNormalizado = this.procurarPaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    let listaTemporaria = this.pacientes.filter((paciente: { nomePaciente: string; }) =>
      paciente.nomePaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === nomeNormalizado
    );
  
    if (listaTemporaria.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Paciente não encontrado.' });
    } else {
      this.pacientes = listaTemporaria;
    }
  
    this.procurarPaciente = '';
  };
  mostrarTodosPacientes() {
    this.pacientes = this.todosPacientes;
  };

  prontuarioPaciente(id: number) {
    this.router.navigate(["listagem-de-prontuarios/prontuario-paciente", id]);
  }
}
