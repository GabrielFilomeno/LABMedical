import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, DropdownModule, CalendarModule, InputMaskModule, InputNumberModule, ButtonModule],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent {
  formCadastroPaciente = new FormGroup({
    nomePaciente: new FormControl(''),
    genero: new FormControl(''),
    dataNascimento: new FormControl<Date | null>(null),
    cpf: new FormControl(''),
    rg: new FormControl(''),
    estadoCivil: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl(''),
    naturalidade: new FormControl(''),
    convenio: new FormControl(''),
    numeroCarteira: new FormControl(''),
    validade: new FormControl<Date | null>(null),
    cep: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    logradouro: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    bairro: new FormControl(''),
    pontoReferencia: new FormControl('')
  })
  
  generos: SelectItem[];
  estadosCivis: SelectItem[];

  constructor() {
    this.generos = [
      {label:'Feminino', value:'Feminino'},
      {label:'Masculino', value:'Masculino'},
      {label:'Não-binário', value:'Não-binário'}
    ];
    this.estadosCivis = [
      {label:'Solteiro', value:'Solteiro'},
      {label:'Casado', value:'Sasado'},
      {label:'Divorciado', value:'Divorciado'},
      {label: 'Viúvo', value: 'Viúvo'}
    ];
  }

  cadastrar () {};
}
