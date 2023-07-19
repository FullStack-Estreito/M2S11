import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IVoluntario } from 'src/app/interfaces/IVoluntario';
import { VoluntariosService } from 'src/app/services/voluntarios.service';

@Component({
  selector: 'app-voluntarios-cadastro',
  templateUrl: './voluntarios-cadastro.component.html',
  styleUrls: ['./voluntarios-cadastro.component.css']
})
export class VoluntariosCadastroComponent {

  cadastroVoluntarioForm: FormGroup;

  constructor(private router: Router, private voluntariosService: VoluntariosService) {
    this.cadastroVoluntarioForm = new FormGroup({
      'nome': new FormControl('', [Validators.required]),
      'telefone': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      'dataNascimento': new FormControl('', [Validators.required]),
      'cpf': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      'areasInteresse': new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    const voluntario: IVoluntario = {
      nome: this.cadastroVoluntarioForm.get('nome')?.value,
      telefone: this.cadastroVoluntarioForm.get('telefone')?.value,
      dataNascimento: this._formatarDataNascimento(this.cadastroVoluntarioForm.get('dataNascimento')?.value),
      cpf: this.cadastroVoluntarioForm.get('cpf')?.value,
      areasInteresse: this.cadastroVoluntarioForm.get('areasInteresse')?.value,
    };
    await this.voluntariosService.cadastrarVoluntario(voluntario);
    this.router.navigate(['/privado/voluntarios']);
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
    return this.cadastroVoluntarioForm.get(field)?.invalid && this.cadastroVoluntarioForm.get(field)?.touched;
  }


}
