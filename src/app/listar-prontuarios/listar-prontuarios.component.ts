import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-listar-prontuarios',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule],
  templateUrl: './listar-prontuarios.component.html',
  styleUrl: './listar-prontuarios.component.scss'
})
export class ListarProntuariosComponent {

  procurarPaciente: any;

  paciente = [
    {
      registro: 1,
      nome: 'nome',
      convenio: 'convenio'
    },
    {
      registro: 2,
      nome: 'nome',
      convenio: 'convenio'
    }
  ]
  pacienteSelecionado: any;
expanded: any;

  onRowSelect(event: any) {
    alert('funcionou')
}

onRowUnselect(event: any) {
  alert('sei la')
}

}
