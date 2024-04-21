import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin = new FormGroup({
    emailLogin: new FormControl(''),
    senhaLogin: new FormControl('')
  });

  formTrocarSenha = new FormGroup({
    emailTrocarSenha: new FormControl(''),
    senhaTrocarSenha: new FormControl(''),
    confirmarSenhaTrocarSenha: new FormControl(''),
  });

  formCadastroUsuario = new FormGroup({
    nomeUsuario: new FormControl(''),
    emailUsuario: new FormControl(''),
    senhaUsuario: new FormControl(''),
    confirmarSenhaUsuario: new FormControl(''),
  });

  modalEsqueceuSenha: boolean = false;
  modalCadastro: boolean = false;


  constructor(private router: Router,) { }

  showDialogTrocarSenha() {
    this.modalEsqueceuSenha = true;
  };

  showDialogCadastro() {
    this.modalCadastro = true;
  };

  trocarSenha(emailTrocarSenha: string | null | undefined) {
    const dadosUsuarios = localStorage.getItem('dadosUsuario');

    if (dadosUsuarios) {
      const listaUsuarios = JSON.parse(dadosUsuarios);
      const usuarioIndex = listaUsuarios.findIndex((usuario: any) => usuario.emailUsuario === emailTrocarSenha);
      console.log(usuarioIndex)

      if (usuarioIndex >= 0) {
        if(confirm(listaUsuarios[usuarioIndex].nomeUsuario + " você tem certeza que deseja trocar senha?")) {
          listaUsuarios[usuarioIndex].senhaUsuario = this.formTrocarSenha.value.senhaTrocarSenha;
          localStorage.setItem('dadosUsuario', JSON.stringify(listaUsuarios));
          
          alert('Você trocou a senha, faça login com a nova senha.');

          this.formTrocarSenha.controls['emailTrocarSenha'].setValue('');
          this.formTrocarSenha.controls['senhaTrocarSenha'].setValue('');
          this.formTrocarSenha.controls['confirmarSenhaTrocarSenha'].setValue('');
          
          this.modalEsqueceuSenha = false;
        }
      } else {
        alert('Usuário não encontrado.');
      }
    } else {
      alert('Não há usuários cadastrados.');
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

    const dadosUsuario = localStorage.getItem('dadosUsuario');

    if (dadosUsuario) {
      usuario = JSON.parse(dadosUsuario);

    } else {
      usuario = [];
    };

    novoUsuario.idUsuario = usuario.length + 1;
    usuario.push(novoUsuario);

    localStorage.setItem('dadosUsuario', JSON.stringify(usuario));
  }

  cadastrar() {
    this.armazenarLocalStorage()
    this.modalCadastro = false;
  }

  logar() {

    this.router.navigate(['/inicio']);
  };
}
