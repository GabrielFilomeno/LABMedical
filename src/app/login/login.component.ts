import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { VerificarLogadoService } from '../shared/services/verificar-logado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule, ToastModule, PasswordModule],
  providers: [MessageService, VerificarLogadoService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    senhaLogin: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  formTrocarSenha = new FormGroup({
    emailTrocarSenha: new FormControl('', [Validators.required, Validators.email]),
    senhaTrocarSenha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmarSenhaTrocarSenha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  formCadastroUsuario = new FormGroup({
    nomeUsuario: new FormControl('', Validators.required),
    emailUsuario: new FormControl('', [Validators.required, Validators.email]),
    senhaUsuario: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmarSenhaUsuario: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  modalEsqueceuSenha: boolean = false;
  modalCadastro: boolean = false;


  constructor(
    private router: Router,
    private messageService: MessageService,
    public verificarLogadoService: VerificarLogadoService
  ) { }

  showDialogTrocarSenha() {
    this.modalEsqueceuSenha = true;
  };

  showDialogCadastro() {
    this.modalCadastro = true;
  };

  trocarSenha(emailTrocarSenha: string | null | undefined) {
    const dadosUsuarioss = localStorage.getItem('dadosUsuarios');

    if (dadosUsuarioss) {
      const listaUsuarios = JSON.parse(dadosUsuarioss);
      const usuarioIndex = listaUsuarios.findIndex((usuario: any) => usuario.emailUsuario === emailTrocarSenha);

      if (this.formTrocarSenha.valid) {
        if (usuarioIndex >= 0) {
          if (this.formTrocarSenha.value.senhaTrocarSenha === this.formTrocarSenha.value.confirmarSenhaTrocarSenha) {
            if (confirm(listaUsuarios[usuarioIndex].nomeUsuario + " você tem certeza que deseja trocar senha?")) {
              listaUsuarios[usuarioIndex].senhaUsuario = this.formTrocarSenha.value.senhaTrocarSenha;
              localStorage.setItem('dadosUsuarios', JSON.stringify(listaUsuarios));

              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Você trocou a senha, faça login com a nova senha.' });

              this.formTrocarSenha.controls['emailTrocarSenha'].setValue('');
              this.formTrocarSenha.controls['senhaTrocarSenha'].setValue('');
              this.formTrocarSenha.controls['confirmarSenhaTrocarSenha'].setValue('');

              this.modalEsqueceuSenha = false;
            } else {
              return;
            };
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Senha e Confirmar Senha devem ser iguais.' });
            return;
          }

        } else if (usuarioIndex < 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario não encontrado.' });
          return;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não há usuários cadastrados.' });
          return;
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente.' });
      }
    }
  }


  armazenarLocalStorage() {

    const novoUsuario = {
      idUsuario: 0,
      nomeUsuario: this.formCadastroUsuario.value.nomeUsuario,
      emailUsuario: this.formCadastroUsuario.value.emailUsuario,
      senhaUsuario: this.formCadastroUsuario.value.senhaUsuario
    };

    let usuario;

    const dadosUsuarios = localStorage.getItem('dadosUsuarios');

    if (dadosUsuarios) {
      usuario = JSON.parse(dadosUsuarios);

    } else {
      usuario = [];
    };

    novoUsuario.idUsuario = usuario.length + 1;
    usuario.push(novoUsuario);

    localStorage.setItem('dadosUsuarios', JSON.stringify(usuario));
  }

  cadastrar() {
    if (this.formCadastroUsuario.valid) {
      if (this.formCadastroUsuario.value.senhaUsuario === this.formCadastroUsuario.value.confirmarSenhaUsuario) {
        this.armazenarLocalStorage()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cadastro Efetuado.' });
        this.modalCadastro = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Senha e Confirmar Senha devem ser iguais.' });
      };
    } else if (
      this.formCadastroUsuario.value.nomeUsuario == '' ||
      this.formCadastroUsuario.value.emailUsuario == '' ||
      this.formCadastroUsuario.value.senhaUsuario == '' ||
      this.formCadastroUsuario.value.confirmarSenhaUsuario == ''
    ) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha todos os campos' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique se os campos estão preenchidos corretamente.' });
      return;
    }
  }

  logar() {
    const dadosUsuarioss = localStorage.getItem('dadosUsuarios');

    if (!this.formLogin.value.emailLogin) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha o email.' });
      return;

    } else if (!this.formLogin.value.senhaLogin) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha a senha.' });
      return;
    } else if (dadosUsuarioss) {

      const listaUsuarios = JSON.parse(dadosUsuarioss);

      const usuarioValido = listaUsuarios.find((usuario: { idUsuario: number, emailUsuario: string; senhaUsuario: string; }) =>
        usuario.emailUsuario === this.formLogin.value.emailLogin && usuario.senhaUsuario === this.formLogin.value.senhaLogin);
      if (usuarioValido) {

        let idUsuario = usuarioValido.idUsuario;
        localStorage.setItem('idUsuarioLogado', JSON.stringify(idUsuario))
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha incorretos.' });
        return;
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não há usuários cadastrados.' });
      return;
    }


    window.location.reload();
    this.verificarLogadoService.login();
    this.router.navigate(["inicio"]);
  };
}
