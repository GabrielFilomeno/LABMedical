import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardPacienteComponent } from "./card-paciente/card-paciente.component";
import { MessageService } from 'primeng/api';
import { EventoEditarService } from '../shared/services/evento-editar.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule, CardPacienteComponent, ToastModule],
  providers: [MessageService]
})
export class InicioComponent {

  procurarPaciente!: string;
  pacientes: any = [];
  listaPacientes: any = [];
  totalConsultas: any;
  totalExames: any;
  constructor(
    private messageService: MessageService,
    private eventoEditarService: EventoEditarService
  ) {
  }

  ngOnInit(): void {
    this.listaPacientes = localStorage.getItem('listaPacientes');
    if (this.listaPacientes) {
      this.pacientes = JSON.parse(this.listaPacientes)
      this.listaPacientes = JSON.parse(this.listaPacientes)
    };

    if (this.pacientes) {
      this.totalConsultas = this.pacientes.reduce((soma: number, paciente: { consultas: string | any[]; }) => {
        return soma + (paciente.consultas && paciente.consultas.length ? paciente.consultas.length : 0);
      }, 0);
      
      this.totalExames = this.pacientes.reduce((soma: number, paciente: { exames: string | any[]; }) => {
        return soma + (paciente.exames && paciente.exames.length ? paciente.exames.length : 0);
      }, 0);
      
    }
    
    

    this.placeHolder()

    this.eventoEditarService.getEvent().subscribe(() => {
      this.atualizarListaPacientes()
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'As alterações foram salvas', life: 3500 });
    });
  };

  atualizarListaPacientes() {
    this.pacientes = JSON.parse(localStorage.getItem('listaPacientes')!);
    this.listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);
  }

  buscarPaciente() {
    const nomeNormalizado = this.procurarPaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    let listaTemporaria = this.pacientes.filter((paciente: { nomePaciente: string; }) =>
      paciente.nomePaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === nomeNormalizado
    );

    if (listaTemporaria.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Paciente não encontrado.' });
    } else {
      this.listaPacientes = listaTemporaria;
    }

    this.procurarPaciente = '';
  }



  mostrarTodosPacientes() {
    this.listaPacientes = this.pacientes;
  }

  placeHolder() {
    let placeHolder = [
      {
        idPaciente: 1,
        nomePaciente: "Teste Silva",
        genero: "Masculino",
        dataNascimento: "1980-01-01",
        cpf: "123.456.789-10",
        rg: "MG-12.345.678",
        estadoCivil: "Casado",
        telefone: "(31) 98765-4321",
        email: "joao.silva@example.com",
        naturalidade: "Belo Horizonte",
        contatoEmergencia: "(31) 98765-4320",
        alergias: "Nenhuma",
        cuidadosEspecificos: "Nenhum",
        convenio: "Unimed",
        numeroConvenio: "123456",
        validade: "2025-12-31",
        consultas: [
          {

            idConsulta: 1,
            motivoConsulta: "Dor de cabeça persistente",
            dataConsulta: "2024-05-1",
            horaConsulta: "09:30",
            descProblema: "O paciente tem sofrido de dores de cabeça frequentes nos últimos dois meses.",
            medicacaoReceitada: "Paracetamol",
            dosagensPrecaucoes: "500mg a cada 6 horas. Não exceder 4 doses em 24 horas."
          },
          {
            idConsulta: 2,
            motivoConsulta: "Dor no peito",
            dataConsulta: "2024-05-15",
            horaConsulta: "14:00",
            descProblema: "O paciente relata dor no peito ao fazer esforço físico.",
            medicacaoReceitada: "Nitroglicerina",
            dosagensPrecaucoes: "Usar conforme necessário. Não exceder 3 doses em 15 minutos."
          }
        ],
        exames: [
          {
            idExame: 1,
            nomeExame: "Exame de Sangue",
            dataExame: "2024-05-02",
            horaExame: "08:00",
            tipoExame: "Hematologia",
            laboratorio: "Laboratório A",
            urlDocumento: "http://exemplo.com/documento1",
            resultadoExame: "Normal"
          },
          {
            idExame: 2,
            nomeExame: "Raio-X",
            dataExame: "2024-05-03",
            horaExame: "14:00",
            tipoExame: "Radiografia convencional",
            laboratorio: "Laboratório B",
            urlDocumento: "http://exemplo.com/documento2",
            resultadoExame: "Anormal"
          }
        ],
        cep: "30000-000",
        cidade: "Belo Horizonte",
        estado: "MG",
        logradouro: "Rua das Flores",
        numero: "123",
        complemento: "Apto 101",
        bairro: "Centro",
        pontoReferencia: "Perto do mercado"
      },
      {
        idPaciente: 2,
        nomePaciente: "ALan Silva",
        genero: "Masculino",
        dataNascimento: "1980-01-01",
        cpf: "123.456.789-10",
        rg: "MG-12.345.678",
        estadoCivil: "Casado",
        telefone: "(31) 98765-4321",
        email: "joao.silva@example.com",
        naturalidade: "Belo Horizonte",
        contatoEmergencia: "(31) 98765-4320",
        alergias: "Nenhuma",
        cuidadosEspecificos: "Nenhum",
        convenio: "Unimed",
        numeroConvenio: "123456",
        validade: "2025-12-31",
        consultas: [
          {

            idConsulta: 1,
            motivoConsulta: "Dor de cabeça persistente",
            dataConsulta: "2024-05-1",
            horaConsulta: "09:30",
            descProblema: "O paciente tem sofrido de dores de cabeça frequentes nos últimos dois meses.",
            medicacaoReceitada: "Paracetamol",
            dosagensPrecaucoes: "500mg a cada 6 horas. Não exceder 4 doses em 24 horas."
          },
          {
            idConsulta: 2,
            motivoConsulta: "Dor no peito",
            dataConsulta: "2024-05-15",
            horaConsulta: "14:00",
            descProblema: "O paciente relata dor no peito ao fazer esforço físico.",
            medicacaoReceitada: "Nitroglicerina",
            dosagensPrecaucoes: "Usar conforme necessário. Não exceder 3 doses em 15 minutos."
          }
        ],
        exames: [
          {
            idExame: 1,
            nomeExame: "Exame de Sangue",
            dataExame: "2024-05-02",
            horaExame: "08:00",
            tipoExame: "Hematologia",
            laboratorio: "Laboratório A",
            urlDocumento: "http://exemplo.com/documento1",
            resultadoExame: "Normal"
          }
        ],
        cep: "30000-000",
        cidade: "Belo Horizonte",
        estado: "MG",
        logradouro: "Rua das Flores",
        numero: "123",
        complemento: "Apto 101",
        bairro: "Centro",
        pontoReferencia: "Perto do mercado"
      },
      {
        idPaciente: 3,
        nomePaciente: "João Silva",
        genero: "Masculino",
        dataNascimento: "1980-01-01",
        cpf: "123.456.789-10",
        rg: "MG-12.345.678",
        estadoCivil: "Casado",
        telefone: "(31) 98765-4321",
        email: "joao.silva@example.com",
        naturalidade: "Belo Horizonte",
        contatoEmergencia: "(31) 98765-4320",
        alergias: "Nenhuma",
        cuidadosEspecificos: "Nenhum",
        convenio: "Unimed",
        numeroConvenio: "123456",
        validade: "2025-12-31",
        consultas: [
          {

            idConsulta: 1,
            motivoConsulta: "Dor de cabeça persistente",
            dataConsulta: "2024-05-10",
            horaConsulta: "09:30",
            descProblema: "O paciente tem sofrido de dores de cabeça frequentes nos últimos dois meses.",
            medicacaoReceitada: "Paracetamol",
            dosagensPrecaucoes: "500mg a cada 6 horas. Não exceder 4 doses em 24 horas."
          }
        ],
        cep: "30000-000",
        cidade: "Belo Horizonte",
        estado: "MG",
        logradouro: "Rua das Flores",
        numero: "123",
        complemento: "Apto 101",
        bairro: "Centro",
        pontoReferencia: "Perto do mercado"
      },
      {
        idPaciente: 4,
        nomePaciente: "Lucas Silva",
        genero: "Masculino",
        dataNascimento: "1980-01-01",
        cpf: "123.456.789-10",
        rg: "MG-12.345.678",
        estadoCivil: "Casado",
        telefone: "(31) 98765-4321",
        email: "joao.silva@example.com",
        naturalidade: "Belo Horizonte",
        contatoEmergencia: "(31) 98765-4320",
        alergias: "Nenhuma",
        cuidadosEspecificos: "Nenhum",
        convenio: "Unimed",
        numeroConvenio: "123456",
        validade: "2025-12-31",
        cep: "30000-000",
        cidade: "Belo Horizonte",
        estado: "MG",
        logradouro: "Rua das Flores",
        numero: "123",
        complemento: "Apto 101",
        bairro: "Centro",
        pontoReferencia: "Perto do mercado"
      }
    ];
    localStorage.setItem('listaPacientes', JSON.stringify(placeHolder));
  }
}
