import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { ProntuarioPacienteComponent } from "./prontuario-paciente/prontuario-paciente.component";
import { RouterOutlet } from '@angular/router';
import { VerificarLogadoService } from './shared/services/verificar-logado.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ComponentesModule, CommonModule, ProntuarioPacienteComponent],
    providers: [VerificarLogadoService]
})
export class AppComponent {
  title = 'LABMedical';
  constructor(public verificarLogadoService: VerificarLogadoService) {}
}
