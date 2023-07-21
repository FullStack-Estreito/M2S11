import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IVoluntario } from 'src/app/interfaces/IVoluntario';
import { VoluntariosService } from 'src/app/services/voluntarios.service';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css']
})
export class VoluntariosComponent implements OnInit {

  voluntarios: IVoluntario[] = [];
  carregando = true;
  msgErro = '';

  constructor(private voluntariosService: VoluntariosService) { }

  async ngOnInit() {
    try {
      this.voluntarios = await this.voluntariosService.obterVoluntarios();
      this.carregando = false;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        this.msgErro = 'Erro na conexão com o servidor, por favor tente mais tarde!';
      else
        this.msgErro = 'Um erro desconhecido aconteceu!!';
    }
  }

}
