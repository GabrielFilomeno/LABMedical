import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  usuarioLogado = {
    emailUsuario: "",
    idUsuario: Number,
    nomeUsuario: "",
    senhaUsuario: ""
  }

  tituloPagina!: string;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(evento => evento instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data)
    )
    .subscribe((evento) => {
      this.tituloPagina = evento['title'];
    });
  }

  ngOnInit(): void {

    const listaUsuarios = localStorage.getItem('dadosUsuarios');
    const idUsuarioLogado = localStorage.getItem('idUsuarioLogado');
    let usuarios;
    let usuarioId: any;

    if (listaUsuarios && idUsuarioLogado) {
      usuarios = JSON.parse(listaUsuarios);
      usuarioId = JSON.parse(idUsuarioLogado);
    };

    this.usuarioLogado = usuarios.find((usuario: { idUsuario: any; }) => usuario.idUsuario === usuarioId);
  };
}
