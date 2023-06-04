import { Component, OnInit } from '@angular/core';
import { ConferenciasService } from '../../services/conferencias.service';
import { ActivatedRoute } from '@angular/router';
import { ConferenciaModel } from 'src/app/models/conferencia.model';

@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.css'],
})
export class ConferenciaComponent implements OnInit {
  conferencia: ConferenciaModel = null;
  cargando = true;

  constructor(
    private conferenciasService: ConferenciasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');

    this.conferenciasService
      .obtenerConferencia(id)
      .subscribe((resp: ConferenciaModel) => {
        this.conferencia = resp;
        this.cargando = false;
      });
  }

  get getCargando(): boolean {
    return this.cargando;
  }
}
