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

}