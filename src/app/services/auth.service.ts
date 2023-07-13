import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado = false;

  constructor(private httpClient: HttpClient) { }

  registrar(usuario: IUsuario) {
    return lastValueFrom(this.httpClient.post('http://localhost:3000/usuarios', usuario));
  }

  async logar(usuario: { email: string, senha: string }) {
    const usuariosCadastrados = await this._obterUsuarios();
    for (const usuarioCadastrado of usuariosCadastrados) {
      const emailValido = usuarioCadastrado.email === usuario.email;
      const senhaValida = usuarioCadastrado.senha === usuario.senha;
      if (emailValido && senhaValida) {
        this.usuarioLogado = true;
        return;
      }
    }
    throw new Error("Usuário não cadastrado!!");
  }

  private _obterUsuarios() {
    return lastValueFrom(this.httpClient.get<IUsuario[]>('http://localhost:3000/usuarios'));
  }
}
