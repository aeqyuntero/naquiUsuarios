import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitaModel } from '../models/cita.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private url: string = 'https://naqui-app-default-rtdb.firebaseio.com/citas';

  constructor(private http: HttpClient) {}

  obtenerCitas(tipoCita: string) {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        const citas: CitaModel[] = this.crearArreglo(resp).filter(
          (cita) =>
            cita.idEmpresa == localStorage.getItem('idEmpresa') &&
            cita.idUsuario == '' &&
            cita.tipoCita == tipoCita
        );
        if (citas.length > 0) {
          return citas;
        } else {
          return [];
        }
      })
    );
  }

  obtenerTusCitas() {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        const citas: CitaModel[] = this.crearArreglo(resp).filter(
          (cita) =>
            cita.idEmpresa == localStorage.getItem('idEmpresa') &&
            cita.idUsuario == localStorage.getItem('token')
        );
        if (citas.length > 0) {
          return citas;
        } else {
          return [];
        }
      })
    );
  }

  private crearArreglo(obj: object): CitaModel[] {
    const citas: CitaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const cita: CitaModel = obj[key];
      cita.id = key;
      citas.push(cita);
    });

    if (obj === null) return [];

    return citas;
  }

  actualizarCita(cita: any) {
    const citaTemp: any = {
      ...cita,
    };

    delete citaTemp.id;

    return this.http.put(`${this.url}/${cita.id}.json`, citaTemp);
  }
}
