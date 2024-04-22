import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './cadastro-exame/cadastro-exame.component';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';
import { ProntuarioPacienteComponent } from './prontuario-paciente/prontuario-paciente.component';
import { verificarLogadoGuard } from './shared/guardaRotas/verificar-logado.guard';
import { paginaLoginGuard } from './shared/guardaRotas/pagina-login.guard';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent,
        canActivate: [paginaLoginGuard],
        data: { title: 'Login' }
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [paginaLoginGuard],
        data: { title: 'Login' }
    },
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [verificarLogadoGuard],
        data: { title: 'ESTATÍSTICAS E INFORMAÇÕES' }
    },
    {
        path: 'cadastro-paciente',
        component: CadastroPacienteComponent,
        canActivate: [verificarLogadoGuard],
        data: { title: 'CADASTRO DE PACIENTE' }
    },
    {
        path: 'cadastro-consulta',
        component: CadastroConsultaComponent,
        canActivate: [verificarLogadoGuard],
        data: { title: 'CADASTRO DE CONSULTA' }
    },
    {
        path: 'cadastro-exame',
        component: CadastroExameComponent,
        canActivate: [verificarLogadoGuard],
        data: { title: 'CADASTRO DE EXAME' }
    },
    {
        path: 'listagem-de-prontuarios',
        component: ListarProntuariosComponent,
        canActivate: [verificarLogadoGuard],
        data: { title: 'LISTAGEM DE PRONTUÁRIOS' },
        children: [
            {
                path: 'prontuario-paciente/:id',
                component: ProntuarioPacienteComponent,
                data: { title: 'PRONTUÁRIO DE PACIENTE' }
            }
        ]
    }

];
