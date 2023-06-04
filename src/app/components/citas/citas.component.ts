import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent implements OnInit {
  tipoCita: string = '';
  citas = [];
  cargandoCitas = true;
  seleccionTipoCita = false;

  constructor(
    private citasService: CitasService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {}

  obtenerCitas() {
    this.seleccionTipoCita = true;
    this.cargandoCitas = true;
    this.citas = [];
    this.citasService.obtenerCitas(this.tipoCita).subscribe((resp: any[]) => {
      if (resp.length == 0) {
        this.cargandoCitas = false;
        return;
      }
      resp.forEach((cita) => {
        console.log(cita);
        this.empleadosService
          .obtenerEmpleado(cita.idEmp)
          .subscribe((empleado: EmpleadoModel) => {
            this.citas.push({
              ...cita,
              nombreEmpleado:
                empleado.primerNombre + ' ' + empleado.primerApellido,
            });
            this.cargandoCitas = false;
          });
      });
    });
  }

  asignarCita(cita: any) {
    Swal.fire({
      title: 'Confirmar',
      icon: 'question',
      text: '¿Deseas asignar esta cita?',
      showCancelButton: true,
    }).then((confirmar) => {
      if (confirmar.isConfirmed) {
        delete cita.nombreEmpleado;
        cita.idUsuario = localStorage.getItem('token');
        this.citasService.actualizarCita(cita).subscribe((resp) => {
          Swal.fire({
            icon: 'success',
            text: 'Cita asignada con éxito',
          }).then(() => {
            this.citas = this.citas.filter((citaArr) => citaArr.id != cita.id);
          });
        });
      }
    });
  }

  get getCargandoCitas(): boolean {
    return this.cargandoCitas;
  }

  get existenRegistros(): boolean {
    return this.citas.length != 0;
  }

  get getSeleccionTipoCita(): boolean {
    return this.seleccionTipoCita;
  }
}
