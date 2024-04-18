import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-cadastro-consulta',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, InputTextareaModule],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss'
})
export class CadastroConsultaComponent {
  formCadastroPaciente = new FormGroup({
    nomePaciente: new FormControl(''),
    dataConsulta: new FormControl<Date | null>(null),
    horaConsulta: new FormControl<Date | null>(null),
    descProblema: new FormControl(''),
    medicacaoReceitada: new FormControl(''),
    dosagensPrecaucoes: new FormControl('')
  });
  procurarPaciente: any;

cadastrar(){};

}
