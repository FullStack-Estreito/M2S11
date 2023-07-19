import { HttpErrorResponse } from '@angular/common/http';
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
  listaDatasEventos: { data: string[], quantidade: number[] } = {
    data: [],
    quantidade: []
  };

  carregando = true;

  constructor(
    private voluntariosService: VoluntariosService,
    private eventosService: EventosService) { }

  async ngOnInit() {
    try{
      this.quantidadeVoluntarios = await this.voluntariosService.obterQuantidadeTotal();
      this.quantidadeEventos = await this.eventosService.obterQuantidadeTotal();
      this.listaDatasEventos = await this.eventosService.obterListaDeEventosPorData();
      this.carregando = false;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        alert('Erro na conexão com o servidor, por favor tente mais tarde!');
      else
        alert('Um erro desconhecido aconteceu!!');
    }
  }
}
