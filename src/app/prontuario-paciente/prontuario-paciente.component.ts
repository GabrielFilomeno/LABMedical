import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CadastroConsultaComponent } from "../cadastro-consulta/cadastro-consulta.component";
import { CadastroExameComponent } from "../cadastro-exame/cadastro-exame.component";
import { EventoEditarService } from '../shared/services/evento-editar.service';

@Component({
  selector: 'app-prontuario-paciente',
  standalone: true,
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss',
  imports: [TimelineModule, CommonModule, CardModule, DropdownModule, ButtonModule, ToastModule, DialogModule, CadastroConsultaComponent, CadastroExameComponent],
  providers: [MessageService]
})
export class ProntuarioPacienteComponent {

  pacientes: any;
  paciente: any;
  prontuarios: any = [];
  visible: boolean = false;
  editarConsulta: boolean = false;
  editarExame: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventoEditarService: EventoEditarService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const listaPacientes = localStorage.getItem('listaPacientes');
    if (listaPacientes) {
      this.pacientes = JSON.parse(listaPacientes);
      this.paciente = this.pacientes.find((paciente: { idPaciente: number; }) => paciente.idPaciente === +id);
    };
    this.renderizarProntuarios()
    console.log(this.prontuarios)

    this.eventoEditarService.getEvent().subscribe(() => {
      console.log('deuuuu boaaaaaaa')
      this.a();
      this.editarConsulta = false;
      this.editarExame = false;
    });
  };

  a() {
    const id = this.route.snapshot.params['id'];
    let listaPacientes = JSON.parse(localStorage.getItem('listaPacientes')!);
    let pacienteAtualizado = listaPacientes.find((paciente: { idPaciente: number; }) => paciente.idPaciente === +id);
    this.paciente = pacienteAtualizado;

    let prontuarioAtualizado: any = [];
    
    if (this.paciente.consultas) {
      this.paciente.consultas.forEach((consulta: any) => {
        let prontuarioConsulta = {
          id: consulta.idConsulta,
          tipo: 'Consulta',
          motivo: consulta.motivoConsulta,
          data: consulta.dataConsulta,
          hora: consulta.horaConsulta,
          descricao: consulta.descProblema,
          medicacao: consulta.medicacaoReceitada,
          dosagensPrecaucoes: consulta.dosagensPrecaucoes,
          imagem: '../../assets/Imagens/consultas.png',
          cor: '#9C27B0'
        };
        prontuarioAtualizado.push(prontuarioConsulta);
      });
    }

    if (this.paciente.exames) {
      this.paciente.exames.forEach((exame: any) => {
        let prontuarioExame = {
          id: exame.idExame,
          tipo: 'Exame',
          nome: exame.nomeExame,
          data: exame.dataExame,
          hora: exame.horaExame,
          tipoExame: exame.tipoExame,
          laboratorio: exame.laboratorio,
          urlDocumento: exame.urlDocumento,
          resultadoExame: exame.resultadoExame,
          imagem: '../../assets/Imagens/exames.png',
          cor: '#673AB7'
        };
        prontuarioAtualizado.push(prontuarioExame);
      });
    }

    this.prontuarios = prontuarioAtualizado;

    this.prontuarios.sort((a: { data: string | number | Date; }, b: { data: string | number | Date; }) => {
      let dataA: Date = new Date(a.data);
      let dataB: Date = new Date(b.data);
      return dataA.getTime() - dataB.getTime();
    });
  }

  renderizarProntuarios() {
    if (this.paciente.consultas) {
      this.paciente.consultas.forEach((consulta: any) => {
        let prontuarioConsulta = {
          id: consulta.idConsulta,
          tipo: 'Consulta',
          motivo: consulta.motivoConsulta,
          data: consulta.dataConsulta,
          hora: consulta.horaConsulta,
          descricao: consulta.descProblema,
          medicacao: consulta.medicacaoReceitada,
          dosagensPrecaucoes: consulta.dosagensPrecaucoes,
          imagem: '../../assets/Imagens/consultas.png',
          cor: '#9C27B0'
        };
        this.prontuarios.push(prontuarioConsulta);
      });
    }

    if (this.paciente.exames) {
      this.paciente.exames.forEach((exame: any) => {
        let prontuarioExame = {
          id: exame.idExame,
          tipo: 'Exame',
          nome: exame.nomeExame,
          data: exame.dataExame,
          hora: exame.horaExame,
          tipoExame: exame.tipoExame,
          laboratorio: exame.laboratorio,
          urlDocumento: exame.urlDocumento,
          resultadoExame: exame.resultadoExame,
          imagem: '../../assets/Imagens/exames.png',
          cor: '#673AB7'
        };
        this.prontuarios.push(prontuarioExame);
      });
    }

    this.prontuarios.sort((a: { data: string | number | Date; }, b: { data: string | number | Date; }) => {
      let dataA: Date = new Date(a.data);
      let dataB: Date = new Date(b.data);
      return dataA.getTime() - dataB.getTime();
    });
  };

  teste(prontuario: any) {
    console.log(prontuario.id)
  }

  editar(prontuario: any) {
    this.visible = true;

    if (prontuario.tipo === 'Consulta') {
      this.editarConsulta = true
      let idEditandoConsulta = prontuario.id;
      localStorage.setItem('idEditandoPaciente', JSON.stringify(this.paciente.idPaciente));
      localStorage.setItem('idEditandoConsulta', JSON.stringify(idEditandoConsulta));
    };
    if (prontuario.tipo === 'Exame') {
      this.editarExame = true;
      let idEditandoExame = prontuario.id;
      localStorage.setItem('idEditandoPaciente', JSON.stringify(this.paciente.idPaciente));
      localStorage.setItem('idEditandoExame', JSON.stringify(idEditandoExame));
    };

    let consultaEditada = prontuario

    console.log(consultaEditada)
  };

  fecharDialog() {
    this.editarConsulta = false;
    this.editarExame = false;

    let idEditandoPaciente = 0;
    localStorage.setItem('idEditandoPaciente', JSON.stringify(idEditandoPaciente));
    let idEditandoConsulta = 0;
    localStorage.setItem('idEditandoConsulta', JSON.stringify(idEditandoConsulta));
    let idEditandoExame = 0;
    localStorage.setItem('idEditandoExame', JSON.stringify(idEditandoExame));
  }
}
