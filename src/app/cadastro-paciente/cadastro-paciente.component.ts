import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CepService } from '../shared/services/cep.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoEditarService } from '../shared/services/evento-editar.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, DropdownModule, CalendarModule, InputMaskModule, InputNumberModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
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
    numeroConvenio: new FormControl(''),
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
    private cepService: CepService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private eventoEditarService: EventoEditarService,
    private confirmationService: ConfirmationService
  ) {
    this.generos = [
      { label: 'Feminino', value: 'Feminino' },
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Não-binário', value: 'Não-binário' }
    ];
    this.estadosCivis = [
      { label: 'Solteiro', value: 'Solteiro' },
      { label: 'Casado', value: 'Casado' },
      { label: 'Divorciado', value: 'Divorciado' },
      { label: 'Viúvo', value: 'Viúvo' }
    ];

    if (this.router.url === '/inicio') {
      this.pegarDadosParaEditar();
    }
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
      numeroConvenio: this.formCadastroPaciente.value.numeroConvenio,
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

      this.formCadastroPaciente.reset();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente.' });
      return;
    };
  };

  editar() {
    if (this.formCadastroPaciente.valid) {
      let listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);
      let idEditandoPaciente = JSON.parse(localStorage.getItem('idEditandoPaciente')!);
      let paciente = listaPacientes.find((paciente: { idPaciente: any; }) => paciente.idPaciente === idEditandoPaciente);
      const index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === idEditandoPaciente);

      paciente = {
        idPaciente: idEditandoPaciente,
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
        numeroConvenio: this.formCadastroPaciente.value.numeroConvenio,
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

      listaPacientes[index] = paciente;
      this.confirmationService.confirm({
        message: 'Salvar alterações?',
        header: `Dados do paciente ${paciente.nomePaciente} foram alterados`,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "Sim",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes))
          this.eventoEditarService.emitEvent('eventoEditar');
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'As alterações não foram salvas', life: 3500 });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente.' });
      return;
    };
  };

  pegarDadosParaEditar() {
    let pacientes = JSON.parse(localStorage.getItem('listaPacientes')!);
    let idEditandoPaciente = JSON.parse(localStorage.getItem('idEditandoPaciente')!);
    let paciente = pacientes.find((paciente: { idPaciente: any; }) => paciente.idPaciente === idEditandoPaciente);

    this.formCadastroPaciente.controls['nomePaciente'].setValue(paciente.nomePaciente);
    this.formCadastroPaciente.controls['genero'].setValue(paciente.genero);
    this.formCadastroPaciente.controls['dataNascimento'].setValue(new Date(paciente.dataNascimento));
    this.formCadastroPaciente.controls['cpf'].setValue(paciente.cpf);
    this.formCadastroPaciente.controls['rg'].setValue(paciente.rg);
    this.formCadastroPaciente.controls['estadoCivil'].setValue(paciente.estadoCivil);
    this.formCadastroPaciente.controls['telefone'].setValue(paciente.telefone);
    this.formCadastroPaciente.controls['email'].setValue(paciente.email);
    this.formCadastroPaciente.controls['naturalidade'].setValue(paciente.naturalidade);
    this.formCadastroPaciente.controls['contatoEmergencia'].setValue(paciente.contatoEmergencia);
    this.formCadastroPaciente.controls['alergias'].setValue(paciente.alergias);
    this.formCadastroPaciente.controls['cuidadosEspecificos'].setValue(paciente.cuidadosEspecificos);
    this.formCadastroPaciente.controls['convenio'].setValue(paciente.convenio);
    this.formCadastroPaciente.controls['numeroConvenio'].setValue(paciente.numeroConvenio);
    this.formCadastroPaciente.controls['validade'].setValue(new Date(paciente.validade));
    this.formCadastroPaciente.controls['cep'].setValue(paciente.cep);
    this.formCadastroPaciente.controls['cidade'].setValue(paciente.cidade);
    this.formCadastroPaciente.controls['estado'].setValue(paciente.estado);
    this.formCadastroPaciente.controls['logradouro'].setValue(paciente.localStorage);
    this.formCadastroPaciente.controls['numero'].setValue(paciente.numero);
    this.formCadastroPaciente.controls['complemento'].setValue(paciente.complemento);
    this.formCadastroPaciente.controls['bairro'].setValue(paciente.bairro);
    this.formCadastroPaciente.controls['pontoReferencia'].setValue(paciente.pontoReferencia);
  }
}
