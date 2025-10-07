import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Doctor {
  _id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string; // <-- Cambia aquí
  rol: string;
  cedula: string;
  direccion: string;
  edad: number;
  especialidad: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  doctores: Doctor[] = [];
  doctorForm: Doctor = this.resetForm();
  editMode: boolean = false;
  notificacion: string = '';
  notificacionColor: string = '';
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDoctores();
  }

  resetForm(): Doctor {
    return {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '', // <-- Cambia aquí
      rol: '',
      cedula: '',
      direccion: '',
      edad: 0,
      especialidad: ''
    };
  }

  getDoctores() {
    this.http.get<any[]>('http://localhost:3000/api/doctor')
      .subscribe(data => {
        // Mapea 'contraseña' a 'contrasena' para cada doctor
        this.doctores = data.map(d => ({
          ...d,
          contrasena: d.contraseña // <-- mapeo aquí
        }));
      });
  }

  openModal() {
    this.editMode = false;
    this.doctorForm = this.resetForm();
    this.notificacion = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.notificacion = '';
    this.editMode = false;
    this.doctorForm = this.resetForm();
  }

  saveDoctor() {
    const payload = {
      nombre: this.doctorForm.nombre,
      apellido: this.doctorForm.apellido,
      correo: this.doctorForm.correo,
      contraseña: this.doctorForm.contrasena, // envía 'contraseña' al backend
      rol: this.doctorForm.rol,
      cedula: this.doctorForm.cedula,
      direccion: this.doctorForm.direccion,
      edad: this.doctorForm.edad,
      especialidad: this.doctorForm.especialidad
    };
    if (this.editMode && this.doctorForm._id) {
      this.http.put(`http://localhost:3000/api/doctor/${this.doctorForm._id}`, payload)
        .subscribe({
          next: () => {
            this.notificacion = 'Doctor actualizado correctamente';
            this.notificacionColor = 'green';
            this.getDoctores();
            this.closeModal();
          },
          error: () => {
            this.notificacion = 'Error al actualizar';
            this.notificacionColor = 'red';
          }
        });
    } else {
      this.http.post('http://localhost:3000/api/doctor', payload)
        .subscribe({
          next: () => {
            this.notificacion = 'Doctor creado correctamente';
            this.notificacionColor = 'green';
            this.getDoctores();
            this.closeModal();
          },
          error: () => {
            this.notificacion = 'Error al crear';
            this.notificacionColor = 'red';
          }
        });
    }
  }

  editDoctor(doctor: Doctor) {
    this.doctorForm = { ...doctor };
    this.editMode = true;
    this.notificacion = '';
    this.showModal = true;
  }

  deleteDoctor(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este doctor?')) {
      this.http.delete(`http://localhost:3000/api/doctor/${id}`)
        .subscribe({
          next: () => {
            this.notificacion = 'Doctor eliminado correctamente';
            this.notificacionColor = 'green';
            this.getDoctores();
          },
          error: () => {
            this.notificacion = 'Error al eliminar';
            this.notificacionColor = 'red';
          }
        });
    }
  }
}
