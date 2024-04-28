import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { PesquisarPacienteService } from '../shared/services/pesquisar-paciente.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-exame',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule, ToastModule, ConfirmDialogModule],
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
  
  procurarPaciente: string = '';
  paciente: any | undefined;
  
  constructor(
    private messageService: MessageService,
    private pesquisarPacienteService: PesquisarPacienteService,
    private confirmationService: ConfirmationService
  ) { this.habilitarForm() };

  habilitarForm() {
    if (this.paciente) {
      this.formCadastroExame.enable();
    } else {
      this.formCadastroExame.disable();
    }
  }

  fecharHoraExame(calendar: Calendar) {
    if (calendar.overlayVisible) {
      calendar.hideOverlay();
    } else {
      calendar.showOverlay();
    }
  }

  buscarPaciente() {
    this.pesquisarPacienteService.buscarPaciente(this.procurarPaciente).subscribe({
      next: (paciente) => {
          this.confirmationService.confirm({
            message: `Paciente encontrado: <strong>(${paciente.nomePaciente})</strong>, deseja prosseguir?`,
            header: 'Confirme o paciente',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
              this.paciente = paciente;
              this.habilitarForm()
            },
            reject: () => {
              this.procurarPaciente = '';
              this.messageService.add({ severity: 'error', summary: 'Paciente Errado', detail: 'Procure outro paciente', life: 3000 });
            }
          });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não há pacientes cadastrados. ' });
      }
    });
  };

  atualizarPaciente() {
    let listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);

    let novoExame = {
      idExame: 0,
      nomeExame: this.formCadastroExame.value.nomeExame,
      dataExame: this.formCadastroExame.value.dataExame,
      horaExame: this.formCadastroExame.value.horaExame,
      tipoExame: this.formCadastroExame.value.tipoExame,
      laboratorio: this.formCadastroExame.value.laboratorio,
      urlDocumento: this.formCadastroExame.value.urlDocumento,
      resultadoExame: this.formCadastroExame.value.resultadoExame,
    };

    if (this.paciente.exames) {
      novoExame.idExame = this.paciente.exames.length + 1;
      this.paciente.exames.push(novoExame);

      let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
      listaPacientes[index] = this.paciente;
      localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
    } else {
      let exames = [{
        idExame: 1,
        nomeExame: this.formCadastroExame.value.nomeExame,
        dataExame: this.formCadastroExame.value.dataExame,
        horaExame: this.formCadastroExame.value.horaExame,
        tipoExame: this.formCadastroExame.value.tipoExame,
        laboratorio: this.formCadastroExame.value.laboratorio,
        urlDocumento: this.formCadastroExame.value.urlDocumento,
        resultadoExame: this.formCadastroExame.value.resultadoExame,
      }];
      this.paciente.exames = exames;

      let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
      listaPacientes[index] = this.paciente;
      localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
    }
  }

  cadastrar() {
    if (this.paciente) {
      if (this.formCadastroExame.valid) {
        this.atualizarPaciente();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exame cadastrado.' });
        this.formCadastroExame.reset();
        this.paciente = undefined;
        this.procurarPaciente = '';
        this.habilitarForm();
        this.formCadastroExame.controls['dataExame'].setValue(new Date);
        this.formCadastroExame.controls['horaExame'].setValue(new Date);
      } else {
        return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente!' });
      }
    } else {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Procure um paciente para cadastrar a consulta!' });
    }
  };
}
