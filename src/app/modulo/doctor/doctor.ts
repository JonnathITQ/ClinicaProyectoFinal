import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css'
})
export class Doctor {
  modalCitasVisible: boolean = false;
  modalHistorialVisible: boolean = false;

  // Ejemplo de citas del día
  citasDelDia = [
    { paciente: 'Juan Pérez', hora_inicio: '09:00', servicio: 'Consulta', estado: 'Pendiente' },
    { paciente: 'Ana Gómez', hora_inicio: '10:30', servicio: 'Limpieza', estado: 'Pendiente' }
  ];

  // Ejemplo de historial médico
  historial = [
    { paciente: 'Juan Pérez', cedula: '0123456789', diagnostico: 'Caries', fecha_creacion: new Date() },
    { paciente: 'Ana Gómez', cedula: '9876543210', diagnostico: 'Ortodoncia', fecha_creacion: new Date() }
  ];

  filtroHistorial: string = '';

  abrirModal(tipo: 'citas' | 'historial') {
    this.modalCitasVisible = tipo === 'citas';
    this.modalHistorialVisible = tipo === 'historial';
  }

  cerrarModal() {
    this.modalCitasVisible = false;
    this.modalHistorialVisible = false;
  }

  historialFiltrado() {
    const filtro = this.filtroHistorial.trim().toLowerCase();
    if (!filtro) return this.historial;
    return this.historial.filter(r =>
      r.paciente.toLowerCase().includes(filtro) ||
      r.cedula.includes(filtro)
    );
  }
}
