import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NaoAutenticadoComponent } from './components/nao-autenticado/nao-autenticado.component';
import { VoluntariosComponent } from './components/voluntarios/voluntarios.component';
import { PrivadoLayoutComponent } from './layouts/privado-layout/privado-layout.component';
import { VoluntariosCadastroComponent } from './components/voluntarios-cadastro/voluntarios-cadastro.component';
import { NaoEncontradoComponent } from './components/nao-encontrado/nao-encontrado.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventosCadastroComponent } from './components/eventos-cadastro/eventos-cadastro.component';
import { ModalErroComponent } from './components/shared/modal-erro/modal-erro.component';
import { CarregandoSpinnerComponent } from './components/shared/carregando-spinner/carregando-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    AuthLayoutComponent,
    InicioComponent,
    HeaderComponent,
    NaoAutenticadoComponent,
    VoluntariosComponent,
    PrivadoLayoutComponent,
    VoluntariosCadastroComponent,
    NaoEncontradoComponent,
    EventosComponent,
    EventosCadastroComponent,
    ModalErroComponent,
    CarregandoSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
