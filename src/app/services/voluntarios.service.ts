import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVoluntario } from '../interfaces/IVoluntario';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {

  constructor(private httpClient: HttpClient) { }

  obterVoluntarios() {
    return lastValueFrom(this.httpClient.get<IVoluntario[]>('http://127.0.0.1:3000/voluntarios'));
  }

  async obterQuantidadeTotal() {
    const voluntarios = await this.obterVoluntarios();
    return voluntarios.length;
  }

  cadastrarVoluntario(voluntario: IVoluntario) {
    return lastValueFrom(this.httpClient.post('http://127.0.0.1:3000/voluntarios', voluntario));
  }
}
