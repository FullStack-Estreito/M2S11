import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nao-autenticado',
  templateUrl: './nao-autenticado.component.html',
  styleUrls: ['./nao-autenticado.component.css']
})
export class NaoAutenticadoComponent {

  constructor(private router: Router) { }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

}
