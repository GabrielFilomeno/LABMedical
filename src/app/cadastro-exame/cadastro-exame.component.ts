import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-cadastro-exame',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule],
  templateUrl: './cadastro-exame.component.html',
  styleUrl: './cadastro-exame.component.scss'
})
export class CadastroExameComponent {
  formCadastroExame = new FormGroup({
    nomeExame: new FormControl(''),
    dataExame: new FormControl<Date | null>(null),
    horaExame: new FormControl<Date | null>(null),
    tipoExame: new FormControl(''),
    laboratorio: new FormControl(''),
    urlDocumento: new FormControl(''),
    resultadoExame: new FormControl(''),
  });
  procurarPaciente: any;

cadastrar(){};
}
