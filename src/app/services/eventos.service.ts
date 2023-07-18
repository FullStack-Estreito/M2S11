import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IEvento } from '../interfaces/IEvento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private httpClient: HttpClient) { }

  obterEventos() {
    return lastValueFrom(this.httpClient.get<IEvento[]>('http://127.0.0.1:3000/eventos'));
  }

  obterEventoPorId(id: number) {
    return lastValueFrom(this.httpClient.get<IEvento>('http://127.0.0.1:3000/eventos/' + id));
  }

  async obterQuantidadeTotal() {
    const eventos = await this.obterEventos();
    return eventos.length;
  }

  async obterListaDeEventosPorData() {
    let listaDatasEventos: { data: string[], quantidade: number[] } = {
      data: [],
      quantidade: []
    };
    const eventos = await this.obterEventos();
    let datas: string[] = [];
    eventos.forEach(evento => datas.push(evento.dataInicio));
    datas.forEach(data => {
      if (listaDatasEventos.data.includes(data))
        listaDatasEventos.quantidade[listaDatasEventos.data.indexOf(data)] += 1;
      else {
        listaDatasEventos.data.push(data);
        listaDatasEventos.quantidade.push(1);
      }
    });
    return listaDatasEventos;
  }

  cadastrar(evento: IEvento) {
    return lastValueFrom(this.httpClient.post('http://127.0.0.1:3000/eventos', evento));
  }

  editar(evento: IEvento) {
    return lastValueFrom(this.httpClient.put(`http://127.0.0.1:3000/eventos/${evento.id}`, evento));
  }

}
