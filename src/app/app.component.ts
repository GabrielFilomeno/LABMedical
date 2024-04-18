import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { CadastroConsultaComponent } from "./cadastro-consulta/cadastro-consulta.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ComponentesModule]
})
export class AppComponent {
  title = 'LABMedical';
}
