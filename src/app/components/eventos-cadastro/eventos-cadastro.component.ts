import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    });
  }

  async onSubmit() {
    // const voluntario: IVoluntario = {
    //   nome: this.cadastroEventoForm.get('nome')?.value,
    //   telefone: this.cadastroEventoForm.get('telefone')?.value,
    //   dataNascimento: this._formatarDataNascimento(this.cadastroEventoForm.get('dataNascimento')?.value),
    //   cpf: this.cadastroEventoForm.get('cpf')?.value,
    //   areasInteresse: this.cadastroEventoForm.get('areasInteresse')?.value,
    // };
    // await this.voluntariosService.cadastrarVoluntario(voluntario);
    // this.router.navigate(['/privado/voluntarios']);
  }

  private _formatarDataNascimento(dataNascimento: string) {
    const data = new Date(dataNascimento);
    let dia = data.getUTCDate().toString();
    if (dia.length === 1 )
      dia = `0${dia}`;
    let mes = (data.getMonth() + 1).toString();
    if (mes.length === 1)
      mes = `0${mes}`;
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  validarMensagemDeErro(field: string) {
    return this.cadastroEventoForm.get(field)?.invalid && this.cadastroEventoForm.get(field)?.touched;
  }

}
