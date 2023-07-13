import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { privadoGuard, publicoGuard } from './guards/auth.guard';
import { NaoAutenticadoComponent } from './components/nao-autenticado/nao-autenticado.component';
import { VoluntariosComponent } from './components/voluntarios/voluntarios.component';
import { PrivadoLayoutComponent } from './layouts/privado-layout/privado-layout.component';

const routes: Routes = [
  { 
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [ publicoGuard ] 
      },
      { 
        path: 'cadastro', 
        component: CadastroComponent,
        canActivate: [ publicoGuard ]
      },
    ] 
  },
  {
    path: 'privado',
    component: PrivadoLayoutComponent,
    children: [
      { 
        path: 'inicio', 
        component: InicioComponent, 
        canActivate: [ privadoGuard ] 
      },
      { 
        path: 'voluntarios', 
        component: VoluntariosComponent, 
        canActivate: [ privadoGuard ] 
      },
    ]
  },
  { path: 'nao-autenticado', component: NaoAutenticadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
