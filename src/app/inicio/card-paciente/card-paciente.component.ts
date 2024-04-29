import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IdadePipe } from "../../shared/pipes/idade.pipe";
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CadastroPacienteComponent } from "../../cadastro-paciente/cadastro-paciente.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-card-paciente',
  standalone: true,
  templateUrl: './card-paciente.component.html',
  styleUrl: './card-paciente.component.scss',
  imports: [IdadePipe, CommonModule, DialogModule, CadastroPacienteComponent, ButtonModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService]
})
export class CardPacienteComponent {
  @Input() pacientes: any;
  @Output() atualizarLista = new EventEmitter<void>();

  listaAtualizada: any;
  visible: boolean = false;
  editar: boolean = false

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    let listaPacientes = localStorage.getItem('listaPacientes');
    if (listaPacientes) {
      this.pacientes = JSON.parse(listaPacientes);
      this.listaAtualizada = JSON.parse(listaPacientes);
    };

  };


  showDialog() {
    this.editar = false;
    this.visible = true;
  };

  editarPaciente() {
    let idEditandoPaciente = this.pacientes.idPaciente;
    if (this.editar === false) {
      this.editar = true;
      localStorage.setItem('idEditandoPaciente', JSON.stringify(idEditandoPaciente))
    } else {
      this.editar = false;
      idEditandoPaciente = 0;
      localStorage.setItem('idEditandoPaciente', JSON.stringify(idEditandoPaciente))
    };
  };

  deletarPaciente(id: number) {
    let temConsultasOuExames = true;
    if (!this.pacientes.consultas && !this.pacientes.exames) {
      temConsultasOuExames = false;
    }
    this.confirmationService.confirm({
      message: temConsultasOuExames ? `O paciente ${this.pacientes.nomePaciente} tem consultas e exames cadastrados. Você está prestes a deletá-lo. Isso irá deletar as consultas e exames juntos! Tem certeza de que deseja continuar?` : `Você está prestes a deletar o paciente ${this.pacientes.nomePaciente}. Tem certeza de que deseja continuar?`,
      header: 'Deletar paciente',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
          this.listaAtualizada = this.listaAtualizada.filter((paciente: { idPaciente: number; }) => paciente.idPaciente !== id);
          localStorage.setItem('listaPacientes', JSON.stringify(this.listaAtualizada));
          this.atualizarLista.emit();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: `O paciente ${this.pacientes.nomePaciente} foi deletado com sucesso.`, life: 3500 });
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: `A ação de deletar o paciente ${this.pacientes.nomePaciente} foi cancelada.`, life: 3500 });
        }
      });
  }
}
