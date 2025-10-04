import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  imports: [RouterModule, CommonModule], // <-- Agrega CommonModule aquí
  templateUrl: './paciente.html',
  styleUrl: './paciente.css'
})
export class Paciente {
  usuario = { nombre: 'Carlos', apellido: 'Pérez' }; // Reemplaza con datos reales del usuario
  servicios: any[] = [];
  servicioSeleccionado: number | null = null;

  constructor(private router: Router) {
    this.cargarServicios();
  }

  async cargarServicios() {
    try {
      const res = await fetch('http://localhost:3000/api/servicios');
      const data = await res.json();
      this.servicios = data.filter((s: any) => s.activo);
    } catch (error) {
      // Puedes mostrar una notificación de error si lo deseas
      this.servicios = [];
    }
  }

  seleccionarServicio(id: number) {
    this.servicioSeleccionado = id;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  irASiguientePaso() {
    // Aquí va la lógica para el siguiente paso
    // Por ejemplo: window.location.href = '/siguiente-paso';
  }
}
