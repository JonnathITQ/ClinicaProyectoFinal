import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css'
})
export class Doctor {
  modalCitasAbierto = false;
  citasPendientes: any[] = [];
  modalHistorialAbierto = false;
  pacientes: any[] = [];
  filtroPaciente: string = '';

  get pacientesFiltrados() {
    const filtro = this.filtroPaciente.trim().toLowerCase();
    if (!filtro) return this.pacientes;
    return this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.apellido.toLowerCase().includes(filtro) ||
      p.cedula.includes(filtro)
    );
  }

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

  async abrirModalHistorial() {
    this.modalHistorialAbierto = true;
    // Obtén todos los pacientes del backend
    const res = await fetch('http://localhost:3000/api/paciente');
    this.pacientes = await res.json();
  }

  cerrarModalHistorial() {
    this.modalHistorialAbierto = false;
    this.filtroPaciente = '';
  }
}
