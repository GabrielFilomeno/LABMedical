import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Calendar, CalendarModule } from 'primeng/calendar';
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
  paciente: any | undefined;

  constructor(
    private messageService: MessageService,
    private pesquisarPacienteService: PesquisarPacienteService,
    private confirmationService: ConfirmationService
  ) { this.habilitarForm() };

  habilitarForm() {
    if (this.paciente) {
      this.formCadastroConsulta.enable();
    } else {
      this.formCadastroConsulta.disable();
    }
  }

  fecharHoraConsulta(calendar: Calendar) {
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

    let novaConsulta = {
      idConsulta: 0,
      motivoConsulta: this.formCadastroConsulta.value.motivoConsulta,
      dataConsulta: this.formCadastroConsulta.value.dataConsulta,
      horaConsulta: this.formCadastroConsulta.value.horaConsulta,
      descProblema: this.formCadastroConsulta.value.descProblema,
      medicacaoReceitada: this.formCadastroConsulta.value.medicacaoReceitada,
      dosagensPrecaucoes: this.formCadastroConsulta.value.dosagensPrecaucoes
    };

    if (this.paciente.consultas) {
      novaConsulta.idConsulta = this.paciente.consultas.length + 1;
      this.paciente.consultas.push(novaConsulta);

      let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
      listaPacientes[index] = this.paciente;
      localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
    } else {
      let consultas = [{
        idConsulta: 1,
        motivoConsulta: this.formCadastroConsulta.value.motivoConsulta,
        dataConsulta: this.formCadastroConsulta.value.dataConsulta,
        horaConsulta: this.formCadastroConsulta.value.horaConsulta,
        descProblema: this.formCadastroConsulta.value.descProblema,
        medicacaoReceitada: this.formCadastroConsulta.value.medicacaoReceitada,
        dosagensPrecaucoes: this.formCadastroConsulta.value.dosagensPrecaucoes
      }];
      this.paciente.consultas = consultas;

      let index = listaPacientes.findIndex((paciente: { idPaciente: any; }) => paciente.idPaciente === this.paciente.idPaciente);
      listaPacientes[index] = this.paciente;
      localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
    }
  }

  cadastrar() {
    if (this.paciente) {
      if (this.formCadastroConsulta.valid) {
        this.atualizarPaciente();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consulta cadastrada.' });
        this.formCadastroConsulta.reset();
        this.paciente = undefined;
        this.procurarPaciente = '';
        this.habilitarForm();
        this.formCadastroConsulta.controls['dataConsulta'].setValue(new Date);
        this.formCadastroConsulta.controls['horaConsulta'].setValue(new Date);
      } else {
        return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente!' });
      }
    } else {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Procure um paciente para cadastrar a consulta!' });
    }
  };
}
