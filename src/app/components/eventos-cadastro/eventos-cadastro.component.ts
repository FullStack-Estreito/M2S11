import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvento } from 'src/app/interfaces/IEvento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-cadastro',
  templateUrl: './eventos-cadastro.component.html',
  styleUrls: ['./eventos-cadastro.component.css']
})
export class EventosCadastroComponent {

  cadastroEventoForm: FormGroup;

  constructor(private router: Router, private eventosService: EventosService) {
    this.cadastroEventoForm = new FormGroup({
      'nome': new FormControl('', [Validators.required]),
      'dataInicio': new FormControl('', [Validators.required]),
      'horarioInicio': new FormControl('', [Validators.required]),
      'dataFinal': new FormControl('', [Validators.required]),
      'horarioFinal': new FormControl('', [Validators.required]),
      'endereco': new FormControl('', [Validators.required]),
      'numeroVoluntarios': new FormControl('', [Validators.required]),
      'descricao': new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    const evento: IEvento = {
      nome: this.cadastroEventoForm.get('nome')?.value,
      dataInicio: this.cadastroEventoForm.get('dataInicio')?.value,
      horarioInicio: this.cadastroEventoForm.get('horarioInicio')?.value,
      dataFinal: this.cadastroEventoForm.get('dataFinal')?.value,
      horarioFinal: this.cadastroEventoForm.get('horarioFinal')?.value,
      endereco: this.cadastroEventoForm.get('endereco')?.value,
      numeroVoluntarios: this.cadastroEventoForm.get('numeroVoluntarios')?.value,
      descricao: this.cadastroEventoForm.get('descricao')?.value
    };

    await this.eventosService.cadastrar(evento);
    this.router.navigate(['/privado/eventos']);
  }

  validarMensagemDeErro(field: string) {
    return this.cadastroEventoForm.get(field)?.invalid && this.cadastroEventoForm.get(field)?.touched;
  }

}
