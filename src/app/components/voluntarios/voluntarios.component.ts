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

  constructor(private voluntariosService: VoluntariosService) { }

  async ngOnInit() {
    this.voluntarios = await this.voluntariosService.obterVoluntarios();
  }

}
