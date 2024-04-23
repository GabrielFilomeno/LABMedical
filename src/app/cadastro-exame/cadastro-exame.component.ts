import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PesquisarPacienteService } from '../shared/services/pesquisar-paciente.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-cadastro-exame',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule, ToastModule, ConfirmDialogModule],
  providers: [PesquisarPacienteService, MessageService, ConfirmationService],
  templateUrl: './cadastro-exame.component.html',
  styleUrl: './cadastro-exame.component.scss'
})
export class CadastroExameComponent {
  formCadastroExame = new FormGroup({
    nomeExame: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
    dataExame: new FormControl(new Date(), Validators.required),
    horaExame: new FormControl(new Date(), Validators.required),
    tipoExame: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]),
    laboratorio: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]),
    urlDocumento: new FormControl('',),
    resultadoExame: new FormControl('', [Validators.required, Validators.maxLength(1024), Validators.minLength(16)]), 
  });
  procurarPaciente: any;
  paciente: any;

  constructor(
    private messageService: MessageService,
    private pesquisarPacienteService: PesquisarPacienteService,
    private confirmationService: ConfirmationService
  ) { };

  buscarPaciente() {
    this.pesquisarPacienteService.buscarPaciente(this.procurarPaciente).subscribe({
      next: (paciente) => {
        this.confirmationService.confirm({
          message: `Paciente encontrado: (${paciente.nomePaciente}), deseja prosseguir?`,
          header: 'Confirme o paciente',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this.paciente = paciente;
          },
          reject: () => {
            this.procurarPaciente = '';
            this.messageService.add({ severity: 'error', summary: 'Paciente Errado', detail: 'Procure outro paciente', life: 3000 });
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  atualizarPaciente() {
    let exames = {
      nomeExame: this.formCadastroExame.value.nomeExame,
      dataExame: this.formCadastroExame.value.dataExame,
      horaExame: this.formCadastroExame.value.horaExame,
      tipoExame: this.formCadastroExame.value.tipoExame,
      laboratorio: this.formCadastroExame.value.laboratorio,
      urlDocumento: this.formCadastroExame.value.urlDocumento,
      resultadoExame: this.formCadastroExame.value.resultadoExame,
    };

    this.paciente.exames = exames;

    let listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);

    let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
    listaPacientes[index] = this.paciente;
    localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
  }

  resetarForm() {
    this.procurarPaciente = '';
    this.paciente = '',
      this.formCadastroExame.controls['nomeExame'].setValue('');
    this.formCadastroExame.controls['dataExame'].setValue(new Date);
    this.formCadastroExame.controls['horaExame'].setValue(new Date);
    this.formCadastroExame.controls['tipoExame'].setValue('');
    this.formCadastroExame.controls['laboratorio'].setValue('');
    this.formCadastroExame.controls['urlDocumento'].setValue('');
    this.formCadastroExame.controls['resultadoExame'].setValue('');
  }

  cadastrar() {
    if (this.paciente) {
      if (this.formCadastroExame.valid) {
        this.atualizarPaciente();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exame cadastrado.' });
        this.resetarForm()
      } else {
        return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente!' });
      }
    } else {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Procure um paciente para cadastrar a consulta!' });
    }
  };
}
