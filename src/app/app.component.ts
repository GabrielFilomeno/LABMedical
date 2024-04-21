import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { ProntuarioPacienteComponent } from "./prontuario-paciente/prontuario-paciente.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ComponentesModule, ProntuarioPacienteComponent]
})
export class AppComponent {
  title = 'LABMedical';
}
