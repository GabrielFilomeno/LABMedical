import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';
import { ListarProntuariosComponent } from "./listar-prontuarios/listar-prontuarios.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ComponentesModule, ListarProntuariosComponent]
})
export class AppComponent {
  title = 'LABMedical';
}
