import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { CadastroPacienteComponent } from "./cadastro-paciente/cadastro-paciente.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ComponentesModule, CadastroPacienteComponent]
})
export class AppComponent {
  title = 'LABMedical';
}
