import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificarLogadoService {

  logado = false;

  login() {
    this.logado = true;
    localStorage.setItem('usuarioLogado', JSON.stringify(this.logado));
  }

  logout() {
    this.logado = false;
    const idUsuarioLogado = 0;
    localStorage.setItem('idUsuarioLogado', JSON.stringify(idUsuarioLogado));
    localStorage.setItem('usuarioLogado', JSON.stringify(this.logado));
  }

  usuarioLogado() {
    let estadoLogado = localStorage.getItem('usuarioLogado')
    if (estadoLogado) {
     let logado = JSON.parse(estadoLogado);
     return logado;
    } else {
      localStorage.setItem('usuarioLogado', JSON.stringify(this.logado));
      return this.logado;
    }
  }
  constructor() { };
}
