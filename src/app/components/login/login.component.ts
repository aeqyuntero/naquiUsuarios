import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.fb.group({
    usuario: [, Validators.required],
    contrasena: [, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      return;
    }

    const usuario: UsuarioModel = {
      id: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      cedula: '',
      direccion: '',
      correo: '',
      telefono: 0,
      edad: 0,
      genero: '',
      activo: true,
      usuario: this.formulario.controls['usuario'].value,
      contrasena: this.formulario.controls['contrasena'].value,
      idEmpresa: '',
    };

    console.log(usuario.usuario);

    this.usuariosService
      .obtenerUsuario(usuario)
      .subscribe((resp: UsuarioModel) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Login Exitoso',
          }).then(() => {
            localStorage.setItem('usuario', resp.usuario);
            localStorage.setItem('token', resp.id);
            localStorage.setItem('idEmpresa', resp.idEmpresa);

            this.router.navigate(['home']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login no válido',
            text: 'El usuario o la contraseña deben ser incorrectos',
          }).then(() => {
            this.formulario.reset();
          });
        }
      });
  }

  campoNoValido(campo: string) {
    return (
      this.formulario.controls[campo].errors &&
      this.formulario.controls[campo].touched
    );
  }
}
