import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-prontuario-paciente',
  standalone: true,
  imports: [TimelineModule, CommonModule, CardModule, DropdownModule, ButtonModule],
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss'
})
export class ProntuarioPacienteComponent {

  eventos = [
    {
      tipo: 'Consulta',
      data: 'Data da Consulta',
      imagem: '../../assets/Imagens/consultas.png',
      cor: '#9C27B0',
      descricao: 'Detalhes da consulta aqui',
    },
    {
      tipo: 'Exame',
      data: 'Data do Exame',
      imagem: '../../assets/Imagens/exames.png',
      cor: '#673AB7',
      descricao: 'Detalhes do exame aqui',
    },
  ];

}
