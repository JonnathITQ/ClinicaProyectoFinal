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
      if (pacienteRaw && pacienteRaw !== 'undefined' && pacienteRaw !== 'null') {
        try {
          paciente = JSON.parse(pacienteRaw);
        } catch (e) {
          paciente = {};
        }
      }
      this.nombre = (paciente as any).nombre || 'Paciente';
      this.apellido = (paciente as any).apellido || '';
      this.cargarServicios();
    }
  }

  async cargarServicios() {
    const res = await fetch('http://localhost:3000/api/servicios');
    const data = await res.json();
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
    const resDoc = await fetch('http://localhost:3000/api/doctor');
    const doctores = await resDoc.json();
    const resDisp = await fetch('http://localhost:3000/api/disponibilidad');
    const disponibilidad = await resDisp.json();
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

    // Validación extra
    if (!(paciente as any).id_paciente) {
      alert('No se encontró el ID del paciente. Por favor, inicia sesión nuevamente.');
      return;
    }
    if (!this.doctorSeleccionado || !this.servicioSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      alert('Completa todos los campos antes de confirmar la cita.');
      return;
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
      window.location.href = '/';
    } else {
      alert('Error al guardar la cita: ' + data.message);
    }
  }
}

interface Doctor {
  id_doctor: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  correo: string;
  disponibilidad?: any[];
}



