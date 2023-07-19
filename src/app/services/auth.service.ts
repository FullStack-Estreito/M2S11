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

  sair() {
    localStorage.clear();
  }

  async logar(usuario: { email: string, senha: string }) {
    const usuariosCadastrados = await this._obterUsuarios();
    for (const usuarioCadastrado of usuariosCadastrados) {
      const emailValido = usuarioCadastrado.email === usuario.email;
      const senhaValida = usuarioCadastrado.senha === usuario.senha;
      if (emailValido && senhaValida) {
        localStorage.setItem('usuario', JSON.stringify(usuarioCadastrado));
        const horario = new Date();
        horario.setMinutes(horario.getMinutes() + 30);
        const horarioString = horario.getTime().toString();
        localStorage.setItem('sessao', horarioString)
        return;
      }
    }
    throw new Error("Usuário não cadastrado!!");
  }

  obterUsuarioPrimeiroNome() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString === null) throw new Error('Usuário nulo!');
    const usuarioLogado = <IUsuario>JSON.parse(usuarioString);
    const nome = usuarioLogado.nomeCompleto;
    if (nome === undefined) throw new Error("Usuário não definido"); 
    return nome.substring(0, nome.indexOf(' '));
  }

  verificarUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return false; 

    const dataString = localStorage.getItem('sessao');
    if (dataString === null) throw new Error('data nula!!');
    const dataSessao = new Date(dataString).getTime();
    const dataAtual = new Date().getTime();
    const sessaoExpirada = dataAtual > dataSessao;
    if (sessaoExpirada) {
      this.sair();
      return false;
    }

    return true; 
  }

  private _obterUsuarios() {
    return lastValueFrom(this.httpClient.get<IUsuario[]>('http://localhost:3000/usuarios'));
  }
}
