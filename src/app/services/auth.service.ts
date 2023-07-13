import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  registrar(usuario: IUsuario) {
    return lastValueFrom(this.httpClient.post('http://localhost:3000/usuarios', usuario));
  }
}
