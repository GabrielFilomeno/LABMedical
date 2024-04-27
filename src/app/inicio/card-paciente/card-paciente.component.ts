import { Component, Input } from '@angular/core';
import { IdadePipe } from "../../shared/pipes/idade.pipe";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card-paciente',
    standalone: true,
    templateUrl: './card-paciente.component.html',
    styleUrl: './card-paciente.component.scss',
    imports: [IdadePipe, CommonModule]
})
export class CardPacienteComponent {
  @Input() pacientes: any;

  constructor () {
    let listaPacientes = localStorage.getItem('listaPacientes');
    if (listaPacientes) {
      this.pacientes = JSON.parse(listaPacientes)
    };

  }

  ngOnInit(): void {
  }
}
