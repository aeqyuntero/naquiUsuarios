import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConferenciaModel } from '../models/conferencia.model';
import { EmpresaModel } from '../models/empresa.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConferenciasService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/conferencias';

  constructor(private http: HttpClient) {}

  obtenerConferencias() {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        if (resp == null || resp == undefined) {
          return [];
        }
        let conferencias: ConferenciaModel[] =
          this.crearArregloConferencias(resp);
        console.log(conferencias);
        if (conferencias.length == 0) {
          return [];
        }
        conferencias.forEach((conf) => {
          conf.empresas = this.crearArregloEmpresasConferencia(conf.empresas);
        });
        console.log(conferencias);
        conferencias = conferencias.filter((conf) => {
          const empresas = conf.empresas.filter(
            (emp) => emp.id == localStorage.getItem('idEmpresa')
          );
          if (empresas.length > 0) {
            return true;
          }
          return false;
        });
        console.log(conferencias);
        return conferencias;
      })
    );
  }

  obtenerConferencia(id: string) {
    return this.http.get(`${this.url}/${id}.json`).pipe(
      map((resp: ConferenciaModel) => {
        resp.empresas = this.crearArregloEmpresasConferencia(resp.empresas);
        return resp;
      })
    );
  }

  private crearArregloConferencias(obj: object) {
    const conferencias: ConferenciaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const conferencia: ConferenciaModel = obj[key];
      conferencia.id = key;
      conferencias.push(conferencia);
    });

    if (obj === null) return [];

    return conferencias;
  }

  private crearArregloEmpresasConferencia(obj: object) {
    const empresaConferencias: EmpresaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const empresaConferencia: EmpresaModel = obj[key];
      empresaConferencia.id = key;
      empresaConferencias.push(empresaConferencia);
    });

    if (obj === null) return [];

    return empresaConferencias;
  }
}
