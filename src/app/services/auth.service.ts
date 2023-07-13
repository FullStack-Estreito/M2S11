import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogadoFlag = false;
  usuarioLogado: IUsuario | null = null;

  constructor(private httpClient: HttpClient) { }

  registrar(usuario: IUsuario) {
    return lastValueFrom(this.httpClient.post('http://localhost:3000/usuarios', usuario));
  }

  sair() {
    this.usuarioLogadoFlag = false;
    this.usuarioLogado = null;
  }

  async logar(usuario: { email: string, senha: string }) {
    const usuariosCadastrados = await this._obterUsuarios();
    for (const usuarioCadastrado of usuariosCadastrados) {
      const emailValido = usuarioCadastrado.email === usuario.email;
      const senhaValida = usuarioCadastrado.senha === usuario.senha;
      if (emailValido && senhaValida) {
        this.usuarioLogadoFlag = true;
        this.usuarioLogado = usuarioCadastrado;
        return;
      }
    }
    throw new Error("Usuário não cadastrado!!");
  }

  obterUsuarioPrimeiroNome() {
    const nome = this.usuarioLogado?.nomeCompleto;
    if (nome === undefined) throw new Error("Usuário não definido"); 
    return nome.substring(0, nome.indexOf(' '));
  }

  private _obterUsuarios() {
    return lastValueFrom(this.httpClient.get<IUsuario[]>('http://localhost:3000/usuarios'));
  }
}
