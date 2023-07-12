import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from 'src/app/services/voluntarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  quantidadeVoluntarios: number = 0;

  constructor(private voluntariosService: VoluntariosService) { }

  async ngOnInit() {
    this.quantidadeVoluntarios = await this.voluntariosService.obterQuantidadeTotal();
  }

}
