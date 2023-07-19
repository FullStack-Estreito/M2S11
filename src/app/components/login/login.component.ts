import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [ Validators.required ])
    });
  }

  async onSubmit() {
    try {
      const usuario = {
        email: this.loginForm.get('email')?.value,
        senha: this.loginForm.get('password')?.value
      };
      await this.authService.logar(usuario);
      this.router.navigate(['privado/inicio']);
    } catch (e) {
      if (e instanceof Error)
        alert('Email ou senha inválidos!!');
      else if (e instanceof HttpErrorResponse)
        alert('Erro na conexão com o servidor, por favor tente mais tarde!');
      else
        alert('Um erro desconhecido aconteceu!!');
    }
  }

  cadastrar() {
    this.router.navigate(['cadastro']);
  }

  validateErrorMessage(field: string) {
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }
}
