import { Component } from '@angular/core';
import { ComponentesModule } from './shared/componentes/componentes.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ComponentesModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LABMedical';
}
