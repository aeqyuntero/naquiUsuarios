import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CitasComponent } from './components/citas/citas.component';
import { CitaComponent } from './components/cita/cita.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { FechaPipe } from './pipes/fecha.pipe';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, FooterComponent, LoginComponent, CitasComponent, CitaComponent, ConferenciasComponent, ConferenciaComponent, DomseguroPipe, FechaPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
