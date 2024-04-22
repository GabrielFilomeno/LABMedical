import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CepService } from '../shared/services/cep.service';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, DropdownModule, CalendarModule, InputMaskModule, InputNumberModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent {
  formCadastroPaciente = new FormGroup({
    nomePaciente: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
    genero: new FormControl('', Validators.required),
    dataNascimento: new FormControl<Date | null>(null, Validators.required),
    cpf: new FormControl('', Validators.required),
    rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    estadoCivil: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    naturalidade: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
    contatoEmergencia: new FormControl('', Validators.required),
    alergias: new FormControl(''),
    cuidadosEspecificos: new FormControl(''),
    convenio: new FormControl(''),
    numeroCarteira: new FormControl(''),
    validade: new FormControl<Date | null>(null),
    cep: new FormControl('', Validators.required),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    logradouro: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    bairro: new FormControl(''),
    pontoReferencia: new FormControl('')
  })

  enderecoPaciente = {
    cep: String,
    cidade: String,
    estado: String,
    logradouro: String,
    bairro: String
  }

  generos: SelectItem[];
  estadosCivis: SelectItem[];

  constructor( 
    private messageService: MessageService,
    private cepService: CepService
  ) {
    this.generos = [
      { label: 'Feminino', value: 'Feminino' },
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Não-binário', value: 'Não-binário' }
    ];
    this.estadosCivis = [
      { label: 'Solteiro', value: 'Solteiro' },
      { label: 'Casado', value: 'Sasado' },
      { label: 'Divorciado', value: 'Divorciado' },
      { label: 'Viúvo', value: 'Viúvo' }
    ];
  }

  armazenarLocalStorage() {
    const novoPaciente = {
      idPaciente: 0,
      nomePaciente: this.formCadastroPaciente.value.nomePaciente,
      genero: this.formCadastroPaciente.value.genero,
      dataNascimento: this.formCadastroPaciente.value.dataNascimento,
      cpf: this.formCadastroPaciente.value.cpf,
      rg: this.formCadastroPaciente.value.rg,
      estadoCivil: this.formCadastroPaciente.value.estadoCivil,
      telefone: this.formCadastroPaciente.value.telefone,
      email: this.formCadastroPaciente.value.email,
      naturalidade: this.formCadastroPaciente.value.naturalidade,
      contatoEmergencia: this.formCadastroPaciente.value.contatoEmergencia,
      alergias: this.formCadastroPaciente.value.alergias,
      cuidadosEspecificos: this.formCadastroPaciente.value.cuidadosEspecificos,
      convenio: this.formCadastroPaciente.value.convenio,
      numeroCarteira: this.formCadastroPaciente.value.numeroCarteira,
      validade: this.formCadastroPaciente.value.validade,
      cep: this.formCadastroPaciente.value.cep,
      cidade: this.formCadastroPaciente.value.cidade,
      estado: this.formCadastroPaciente.value.estado,
      logradouro: this.formCadastroPaciente.value.logradouro,
      numero: this.formCadastroPaciente.value.numero,
      complemento: this.formCadastroPaciente.value.complemento,
      bairro: this.formCadastroPaciente.value.bairro,
      pontoReferencia: this.formCadastroPaciente.value.pontoReferencia
    };

    let pacientes;
    const listaPacientes = localStorage.getItem('listaPacientes');

    if (listaPacientes) {
      pacientes = JSON.parse(listaPacientes);

    } else {
      pacientes = [];
    };

    novoPaciente.idPaciente = pacientes.length + 1;
    pacientes.push(novoPaciente);

    localStorage.setItem('listaPacientes', JSON.stringify(pacientes));
  };

  procurarCep() {

    if (this.formCadastroPaciente.controls.cep.errors) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha o CEP para procurar.' });
    } else if (this.formCadastroPaciente.value.cep) {
      this.cepService.getCep(this.formCadastroPaciente.value.cep).subscribe({
        next: (dados) => {
          if (confirm("O endereço esta correto?" + "\n"
            + "CEP: " + dados.cep + "\n"
            + "Cidade: " + dados.localidade + "\n"
            + "Estado: " + dados.uf + "\n"
            + "Logradouro: " + dados.logradouro + "\n"
            + "Bairro: " + dados.bairro)) {
            this.enderecoPaciente = {
              cep: dados.cep,
              cidade: dados.localidade,
              estado: dados.uf,
              logradouro: dados.logradouro,
              bairro: dados.bairro
            };

          this.formCadastroPaciente.controls['cidade'].setValue(dados.localidade);
          this.formCadastroPaciente.controls['estado'].setValue(dados.uf);
          this.formCadastroPaciente.controls['logradouro'].setValue(dados.logradouro);
          this.formCadastroPaciente.controls['bairro'].setValue(dados.bairro);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite o CEP novamente.' });
            this.formCadastroPaciente.controls['cep'].setValue('');
          }
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'CEP invalido.' });
          this.formCadastroPaciente.controls['cep'].setValue('');
          console.error(error);
        }
      });
    };
  };

  cadastrar() {
    if (this.formCadastroPaciente.valid) {
        this.armazenarLocalStorage()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Paciente Cadastrado.' });

        this.formCadastroPaciente.controls['nomePaciente'].setValue('');
        this.formCadastroPaciente.controls['genero'].setValue('');
        this.formCadastroPaciente.controls['dataNascimento'].setValue(new Date);
        this.formCadastroPaciente.controls['cpf'].setValue('');
        this.formCadastroPaciente.controls['rg'].setValue('');
        this.formCadastroPaciente.controls['estadoCivil'].setValue('');
        this.formCadastroPaciente.controls['telefone'].setValue('');
        this.formCadastroPaciente.controls['email'].setValue('');
        this.formCadastroPaciente.controls['naturalidade'].setValue('');
        this.formCadastroPaciente.controls['contatoEmergencia'].setValue('');
        this.formCadastroPaciente.controls['alergias'].setValue('');
        this.formCadastroPaciente.controls['cuidadosEspecificos'].setValue('');
        this.formCadastroPaciente.controls['convenio'].setValue('');
        this.formCadastroPaciente.controls['numeroCarteira'].setValue('');
        this.formCadastroPaciente.controls['validade'].setValue(new Date);
        this.formCadastroPaciente.controls['cep'].setValue('');
        this.formCadastroPaciente.controls['cidade'].setValue('');
        this.formCadastroPaciente.controls['estado'].setValue('');
        this.formCadastroPaciente.controls['logradouro'].setValue('');
        this.formCadastroPaciente.controls['numero'].setValue('');
        this.formCadastroPaciente.controls['complemento'].setValue('');
        this.formCadastroPaciente.controls['bairro'].setValue('');
        this.formCadastroPaciente.controls['pontoReferencia'].setValue('');
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente.' });
      return;
    };
  };
}
