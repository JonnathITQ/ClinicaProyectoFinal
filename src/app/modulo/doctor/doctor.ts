import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor',
  imports: [RouterModule, CommonModule],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css'
})
export class Doctor {
  modalCitasAbierto = false;
  citasPendientes: any[] = [];

  async abrirModalCitas() {
    this.modalCitasAbierto = true;
    // Obtén las citas pendientes del backend
    const res = await fetch('http://localhost:3000/api/citas');
    const data = await res.json();
    // Filtra solo las pendientes
    this.citasPendientes = data.filter((c: any) => c.estado === 'pendiente');
    // Si tienes nombres de paciente/servicio, deberías obtenerlos aquí
    // Puedes hacer una petición adicional o incluirlos en la respuesta del backend
  }

  cerrarModalCitas() {
    this.modalCitasAbierto = false;
  }
}
