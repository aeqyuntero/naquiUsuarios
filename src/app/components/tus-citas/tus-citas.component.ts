import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import { CitasService } from 'src/app/services/citas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tus-citas',
  templateUrl: './tus-citas.component.html',
  styleUrls: ['./tus-citas.component.css'],
})
export class TusCitasComponent implements OnInit {
  citas = [];
  cargandoEmp = true;
  cargandoCitas = true;

  constructor(
    private citasService: CitasService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.cargandoCitas = true;
    this.citas = [];
    this.citasService.obtenerTusCitas().subscribe((resp: any[]) => {
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

  eliminarCita(cita: any) {
    Swal.fire({
      title: 'Confirmar',
      icon: 'question',
      text: '¿Deseas eliminar esta cita?',
      showCancelButton: true,
    }).then((confirmar) => {
      if (confirmar.isConfirmed) {
        delete cita.nombreEmpleado;
        cita.idUsuario = '';
        this.citasService.actualizarCita(cita).subscribe((resp) => {
          Swal.fire({
            icon: 'success',
            text: 'Cita eliminada con éxito',
          }).then(() => {
            this.citas = this.citas.filter((citaArr) => citaArr.id != cita.id);
          });
        });
      }
    });
  }

  get getCargandoEmp(): boolean {
    return this.cargandoEmp;
  }

  get getCargandoCitas(): boolean {
    return this.cargandoCitas;
  }

  get existenRegistros(): boolean {
    return this.citas.length != 0;
  }
}
