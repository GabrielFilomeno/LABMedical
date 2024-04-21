import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './cadastro-exame/cadastro-exame.component';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';
import { ProntuarioPacienteComponent } from './prontuario-paciente/prontuario-paciente.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'cadastro-paciente',
        component: CadastroPacienteComponent
    },
    {
        path: 'cadastro-consulta',
        component: CadastroConsultaComponent
    },
    {
        path: 'cadastro-exame',
        component: CadastroExameComponent
    },
    {
        path: 'listagem-de-prontuarios',
        component: ListarProntuariosComponent,
        children: [
            {
                path: 'prontuario-paciente/:id',
                component: ProntuarioPacienteComponent
            }
        ]
    }

];
