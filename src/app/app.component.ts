import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentesModule } from './shared/componentes/componentes.module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
<<<<<<< HEAD
    imports: [RouterOutlet]
=======
    imports: [RouterOutlet, ComponentesModule]
>>>>>>> feature/criar-menu-lateral
})
export class AppComponent {
  title = 'LABMedical';
}
