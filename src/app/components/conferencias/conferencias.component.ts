import { Component, OnInit } from '@angular/core';
import { ConferenciaModel } from 'src/app/models/conferencia.model';
import { ConferenciasService } from 'src/app/services/conferencias.service';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.css'],
})
export class ConferenciasComponent implements OnInit {
  conferencias: ConferenciaModel[];
  cargando = true;

  constructor(private conferenciasServices: ConferenciasService) {}

  ngOnInit(): void {
    this.conferenciasServices.obtenerConferencias().subscribe((resp) => {
      this.conferencias = resp;
      this.cargando = false;
    });
  }

  obtenerMiniatura(conferencia: ConferenciaModel) {
    const codigo = conferencia.url.split('embed/')[1];
    return `https://img.youtube.com/vi/${codigo}/mqdefault.jpg`;
  }

  get getCargandoConferencias() {
    return this.cargando;
  }

  get existenRegistros() {
    return this.conferencias.length != 0;
  }
}
