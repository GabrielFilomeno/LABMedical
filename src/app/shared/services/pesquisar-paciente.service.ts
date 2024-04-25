import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisarPacienteService {

  pacientes!: [{
    idPaciente: Number,
    nomePaciente: '',
    genero: '',
    dataNascimento: Date,
    cpf: '',
    rg: ''
    estadoCivil: '',
    telefone: '',
    email: '',
    naturalidade: '',
    contatoEmergencia: '',
    alergias: '',
    cuidadosEspecificos: '',
    convenio: ''
    numeroCarteira: '',
    validade: Date,
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    pontoReferencia: ''
  }]

  constructor(private messageService: MessageService) {
    const listaPacientes = localStorage.getItem('listaPacientes');

    if (listaPacientes) {
      this.pacientes = JSON.parse(listaPacientes);
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Não há pacientes cadastrados.' });
    }
  }
    
    
    buscarPaciente(nome: string): Observable<any> {
      return new Observable(observer => {
          const nomeNormalizado = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          
          let paciente = this.pacientes.find((paciente) =>
            paciente.nomePaciente.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === nomeNormalizado
        );
        if (!paciente) {
          return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Paciente não encontrado.' });
        }
        observer.next(paciente);
        observer.complete();
      
    })
  }
}

