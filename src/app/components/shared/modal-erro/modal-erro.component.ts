import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-erro',
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.css']
})
export class ModalErroComponent {

  mostrarModal = true;
  @Output() fecharEvento: EventEmitter<string> = new EventEmitter<string>();
  
  fechar() {
    this.fecharEvento.emit("fechou");
    this.mostrarModal = false;
  }

}
