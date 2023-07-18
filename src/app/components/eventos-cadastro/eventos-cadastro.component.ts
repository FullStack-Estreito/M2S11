import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IEvento } from 'src/app/interfaces/IEvento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-cadastro',
  templateUrl: './eventos-cadastro.component.html',
  styleUrls: ['./eventos-cadastro.component.css']
})
export class EventosCadastroComponent implements OnInit {

  modoEdicao = false;
  eventoEdicao?: IEvento;
  cadastroEventoForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private eventosService: EventosService) {

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

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const id = params['id'];
      if (id === undefined) return;
      this.modoEdicao = true;
      this.eventoEdicao = await this.eventosService.obterEventoPorId(id);
      this._preencherCamposFormularioEdicao();
    });
  }

  private _preencherCamposFormularioEdicao() {
    this.cadastroEventoForm.get('nome')?.setValue(this.eventoEdicao?.nome);
    this.cadastroEventoForm.get('dataInicio')?.setValue(this.eventoEdicao?.dataInicio);
    this.cadastroEventoForm.get('horarioInicio')?.setValue(this.eventoEdicao?.horarioInicio);
    this.cadastroEventoForm.get('dataFinal')?.setValue(this.eventoEdicao?.dataFinal);
    this.cadastroEventoForm.get('horarioFinal')?.setValue(this.eventoEdicao?.horarioFinal);
    this.cadastroEventoForm.get('endereco')?.setValue(this.eventoEdicao?.endereco);
    this.cadastroEventoForm.get('numeroVoluntarios')?.setValue(this.eventoEdicao?.numeroVoluntarios);
    this.cadastroEventoForm.get('descricao')?.setValue(this.eventoEdicao?.descricao);
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

    if (this.modoEdicao) {
      evento.id = this.eventoEdicao?.id;
      await this.eventosService.editar(evento);
    }
    else
      await this.eventosService.cadastrar(evento);
    
    this.router.navigate(['/privado/eventos']);
  }

  validarMensagemDeErro(field: string) {
    return this.cadastroEventoForm.get(field)?.invalid && this.cadastroEventoForm.get(field)?.touched;
  }

}
