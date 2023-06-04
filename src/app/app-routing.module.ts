import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { CitasComponent } from './components/citas/citas.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { TusCitasComponent } from './components/tus-citas/tus-citas.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'citas',
    component: CitasComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'tusCitas',
    component: TusCitasComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'conferencias',
    component: ConferenciasComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'conferencia/:id',
    component: ConferenciaComponent,
    canActivate: [AutenticacionGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
