import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardPacienteComponent } from "./card-paciente/card-paciente.component";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule, CardPacienteComponent],
  providers: [MessageService],
})
export class InicioComponent {
  procurarPaciente!: string;
  pacientes: any;
  listaPacientes: any;
  totalConsultas: any;
  totalExames: any;
  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.listaPacientes = localStorage.getItem('listaPacientes');
    if (this.listaPacientes) {
      this.pacientes = JSON.parse(this.listaPacientes)
      this.listaPacientes = JSON.parse(this.listaPacientes)
    };
    
    this.totalConsultas = this.pacientes.reduce((soma: number, paciente: { consultas: string | any[]; }) => {
      return soma + (paciente.consultas ? paciente.consultas.length : 0);
    }, 0);
    
    this.totalExames = this.pacientes.reduce((soma: number, paciente: { exames: string | any[]; }) => {
      return soma + (paciente.exames ? paciente.exames.length : 0);
    }, 0);
  };

buscarPaciente() {
  this.listaPacientes = this.pacientes;
    const nomeNormalizado = this.procurarPaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    this.listaPacientes = this.listaPacientes.filter((paciente: { nomePaciente: string; }) =>
      paciente.nomePaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === nomeNormalizado
    );
    if (!this.listaPacientes) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Paciente não encontrado.' });
    };
    console.log(this.listaPacientes.length)
    this.procurarPaciente = '';
  };

  mostrarTodosPacientes() {
  this.listaPacientes = this.pacientes;
  }
}
