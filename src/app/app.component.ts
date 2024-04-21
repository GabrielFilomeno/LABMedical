import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { ProntuarioPacienteComponent } from "./prontuario-paciente/prontuario-paciente.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ComponentesModule, ProntuarioPacienteComponent]
})
export class AppComponent {
  title = 'LABMedical';
}
