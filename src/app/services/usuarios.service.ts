import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuario(usuario: UsuarioModel) {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp: any[]) => {
        let usuarioValido: UsuarioModel = null;
        const usuarios = this.crearArreglo(resp);
        usuarios.forEach((usu) => {
          if (
            usu.usuario == usuario.usuario &&
            usu.contrasena == usuario.contrasena
          ) {
            usuarioValido = usu;
          }
        });
        return usuarioValido;
      })
    );
  }

  private crearArreglo(obj: object) {
    const usuarios: UsuarioModel[] = [];

    Object.keys(obj).forEach((key) => {
      const usuario: UsuarioModel = obj[key];
      usuario.id = key;
      usuarios.push(usuario);
    });

    if (obj === null) return [];

    return usuarios;
  }
}
