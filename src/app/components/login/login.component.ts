import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [ Validators.required ])
    });
  }

  onSubmit() {
    this.router.navigate(['inicio']);
  }

  cadastrar() {
    this.router.navigate(['cadastro']);
  }

  validateErrorMessage(field: string) {
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }
}
