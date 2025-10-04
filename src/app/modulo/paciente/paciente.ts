import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente',
  imports: [CommonModule],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css'
})
export class Paciente {
  usuario = { nombre: 'Carlos', _id: 'ID_DEL_PACIENTE' }; // Usa el ID real del paciente
  servicios: any[] = [];
  servicioSeleccionado: number | null = null;
  citasDisponibles: any[] = [];
  fase: number = 1;

  constructor() {
    this.cargarServicios();
  }

  async cargarServicios() {
    try {
      const res = await fetch('http://localhost:3000/api/servicios');
      this.servicios = await res.json();
    } catch (error) {
      this.servicios = [];
    }
  }

  seleccionarServicio(id: number) {
    this.servicioSeleccionado = id;
  }

  async irASiguientePaso() {
    if (this.servicioSeleccionado) {
      await this.cargarCitasDisponibles();
      this.fase = 2;
    }
  }

  async cargarCitasDisponibles() {
    try {
      const res = await fetch('http://localhost:3000/api/citas/disponibles');
      this.citasDisponibles = await res.json();
    } catch (error) {
      this.citasDisponibles = [];
    }
  }

  async reservarCita(citaId: string) {
    const pacienteId = this.usuario._id;
    const res = await fetch('http://localhost:3000/api/citas/reservar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ citaId, pacienteId })
    });
    const data = await res.json();
    if (data.success) {
      this.citasDisponibles = this.citasDisponibles.filter(cita => cita._id !== citaId);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
