import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css'
})
export class Paciente implements OnInit {
  nombre: string = '';
  apellido: string = '';
  fase: number = 1;

  servicios: any[] = [];
  servicioSeleccionado: number | null = null;
  servicioNombreSeleccionado: string = '';

  doctores: any[] = [];
  doctorSeleccionado: number | null = null;
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const pacienteRaw = localStorage.getItem('paciente');
      let paciente = {};
      // Solo parsea si el valor existe y no es la cadena "undefined" o "null"
      if (pacienteRaw && pacienteRaw !== 'undefined' && pacienteRaw !== 'null') {
        try {
          paciente = JSON.parse(pacienteRaw);
        } catch (e) {
          paciente = {};
        }
      }
      this.nombre = (paciente as any).nombre || 'Paciente';
      this.apellido = (paciente as any).apellido || '';

      // Cargar servicios desde el backend
      this.cargarServicios();
    }
  }

  async cargarServicios() {
    const res = await fetch('http://localhost:3000/api/servicios');
    const data = await res.json();
    console.log('Servicios:', data); // <-- Depuración
    this.servicios = data;
  }

  seleccionarServicio(id_servicio: number) {
    this.servicioSeleccionado = id_servicio;
    const servicio = this.servicios.find(s => s.id_servicio === id_servicio);
    this.servicioNombreSeleccionado = servicio ? servicio.nombre : '';
  }

  async siguienteFase() {
    if (this.servicioSeleccionado) {
      this.fase = 2;
      await this.cargarDoctoresConDisponibilidad();
    }
  }

  async cargarDoctoresConDisponibilidad() {
    // Obtén doctores
    const resDoc = await fetch('http://localhost:3000/api/doctor');
    const doctores = await resDoc.json();

    // Obtén disponibilidad
    const resDisp = await fetch('http://localhost:3000/api/disponibilidad');
    const disponibilidad = await resDisp.json();

    // Une doctores con su disponibilidad
    this.doctores = doctores.map((doc: Doctor) => {
      const disp = disponibilidad.find((d: any) => d.id_doctor === doc.id_doctor);
      return { ...doc, disponibilidad: disp ? disp.disponibilidad : [] };
    });
  }

  seleccionarDoctor(id_doctor: number) {
    this.doctorSeleccionado = id_doctor;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
  }

  seleccionarHorario(id_doctor: number, fecha: string, hora: string, event: Event) {
    event.stopPropagation();
    this.doctorSeleccionado = id_doctor;
    this.fechaSeleccionada = fecha;
    this.horaSeleccionada = hora;
  }

  async confirmarCita() {
    // Obtén el paciente desde localStorage
    let paciente = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      const pacienteRaw = localStorage.getItem('paciente');
      if (
        pacienteRaw &&
        pacienteRaw !== 'undefined' &&
        pacienteRaw !== 'null'
      ) {
        try {
          paciente = JSON.parse(pacienteRaw);
        } catch (e) {
          paciente = {};
        }
      }
    }

    const cita = {
      id_paciente: (paciente as any).id_paciente,
      id_doctor: this.doctorSeleccionado,
      id_servicio: this.servicioSeleccionado,
      fecha_cita: this.fechaSeleccionada,
      hora_inicio: this.horaSeleccionada,
      estado: 'pendiente',
      notas: ''
    };

    const res = await fetch('http://localhost:3000/api/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    });
    const data = await res.json();
    if (data.success) {
      // Redirige al inicio
      window.location.href = '/';
    } else {
      alert('Error al guardar la cita: ' + data.message);
    }
  }
}

// Si tienes una interfaz Doctor:
interface Doctor {
  id_doctor: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  correo: string;
  // ...otros campos...
  disponibilidad?: any[];
}
