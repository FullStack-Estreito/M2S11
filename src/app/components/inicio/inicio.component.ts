import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { VoluntariosService } from 'src/app/services/voluntarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  quantidadeVoluntarios: number = 0;
  quantidadeEventos: number = 0;

  constructor(
    private voluntariosService: VoluntariosService,
    private eventosService: EventosService) { }

  async ngOnInit() {
    this.quantidadeVoluntarios = await this.voluntariosService.obterQuantidadeTotal();
    this.quantidadeEventos = await this.eventosService.obterQuantidadeTotal();
  }

}
