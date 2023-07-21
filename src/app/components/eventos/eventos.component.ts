import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEvento } from 'src/app/interfaces/IEvento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  eventos: IEvento[] = [];
  carregando = true;
  msgErro = '';

  constructor(private eventosService: EventosService, private router: Router) { }

  async ngOnInit() {
    try {
      this.eventos = await this.eventosService.obterEventos();
      this.carregando = false;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        this.msgErro = 'Erro na conexão com o servidor, por favor tente mais tarde!';
      else
        this.msgErro = 'Um erro desconhecido aconteceu!!';
    }
  }

  editar(evento: IEvento) {
    this.router.navigate(
      ['/privado/eventos-cadastro'],
      { queryParams: { id: evento.id } }  
    );
  }

}
