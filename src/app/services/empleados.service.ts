import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/empleados';

  constructor(private http: HttpClient) {}

  obtenerEmpleado(idEmp: string) {
    return this.http.get(`${this.url}/${idEmp}.json`).pipe(
      map((resp: any) => {
        resp.empresas = [];
        return resp;
      })
    );
  }
}
