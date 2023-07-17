import { Component } from '@angular/core';
import { IEvento } from 'src/app/interfaces/IEvento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  eventos: IEvento[] = [];

  constructor(private eventosService: EventosService) { }

  async ngOnInit() {
    this.eventos = await this.eventosService.obterEventos();
  }

}
