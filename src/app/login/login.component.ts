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

  formCadastroUsuario = new FormGroup({
    nomeUsuario: new FormControl(''),
    emailUsuario: new FormControl(''),
    senhaUsuario: new FormControl(''),
    confirmarSenhaUsuario: new FormControl(''),
  });

  visible: boolean = false;

  
  constructor (private router: Router,) {}
  
  showDialog() {
      this.visible = true;
  };

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

    novoUsuario.idUsuario = usuario.length +1;
    usuario.push(novoUsuario);

    localStorage.setItem('dadosUsuario', JSON.stringify(usuario));
  }

  cadastrar() {
    this.armazenarLocalStorage()
    this.visible = false;
  }

  logar(){

    this.router.navigate(['/inicio']);
  };
}
