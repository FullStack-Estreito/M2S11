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

  constructor(private eventosService: EventosService, private router: Router) { }

  async ngOnInit() {
    this.eventos = await this.eventosService.obterEventos();
  }

  editar(evento: IEvento) {
    this.router.navigate(
      ['/privado/eventos-cadastro'],
      { queryParams: { id: evento.id } }  
    );
  }

}
