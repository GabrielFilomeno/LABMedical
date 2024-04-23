import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PesquisarPacienteService } from '../shared/services/pesquisar-paciente.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-cadastro-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule, ConfirmDialogModule, ToastModule],
  providers: [PesquisarPacienteService, MessageService, ConfirmationService],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss'
})
export class CadastroConsultaComponent {
  formCadastroConsulta = new FormGroup({
    motivoConsulta: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
    dataConsulta: new FormControl(new Date(), Validators.required),
    horaConsulta: new FormControl(new Date(), Validators.required),
    descProblema: new FormControl('', [Validators.required, Validators.maxLength(1024), Validators.minLength(16)]),
    medicacaoReceitada: new FormControl(''),
    dosagensPrecaucoes: new FormControl('', [Validators.required, Validators.maxLength(256), Validators.minLength(16)])
  });

  procurarPaciente: string = '';
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
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
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
    let consultas = {
      motivoConsulta: this.formCadastroConsulta.value.motivoConsulta,
      dataConsulta: this.formCadastroConsulta.value.dataConsulta,
      horaConsulta: this.formCadastroConsulta.value.horaConsulta,
      descProblema: this.formCadastroConsulta.value.descProblema,
      medicacaoReceitada: this.formCadastroConsulta.value.medicacaoReceitada,
      dosagensPrecaucoes: this.formCadastroConsulta.value.dosagensPrecaucoes
    };
    this.paciente.consultas = consultas;

    let listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);

    let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
    listaPacientes[index] = this.paciente;
    localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
  }

  resetarForm() {
    this.procurarPaciente = '';
    this.paciente = '',
    this.formCadastroConsulta.controls['motivoConsulta'].setValue('');
    this.formCadastroConsulta.controls['dataConsulta'].setValue(new Date);
    this.formCadastroConsulta.controls['horaConsulta'].setValue(new Date);
    this.formCadastroConsulta.controls['descProblema'].setValue('');
    this.formCadastroConsulta.controls['medicacaoReceitada'].setValue('');
    this.formCadastroConsulta.controls['dosagensPrecaucoes'].setValue('');
  }

  cadastrar() {
    if (this.paciente) {
      if (this.formCadastroConsulta.valid) {
        this.atualizarPaciente();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consulta cadastrada.' });
        this.resetarForm()
      } else {
        return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente!' });
      }
    } else {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Procure um paciente para cadastrar a consulta!' });
    }
  };
}
