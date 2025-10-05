import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-paciente.html',
  styleUrl: './register-paciente.css'
})
export class RegisterPaciente {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';
  fase: number = 1;

  // Campos del formulario
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  edad: number | null = null;
  cedula: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(public router: Router) {}

  siguienteFase() {
    // Validación simple de fase 1
    if (!this.nombre || !this.apellido || !this.direccion || !this.edad) {
      this.mensaje = 'Complete todos los campos de la fase 1.';
      this.tipoMensaje = 'error';
      return;
    }
    this.mensaje = '';
    this.tipoMensaje = '';
    this.fase = 2;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    // Validación simple de fase 2
    if (!this.cedula || !this.correo || !this.contrasena) {
      this.mensaje = 'Complete todos los campos de la fase 2.';
      this.tipoMensaje = 'error';
      return;
    }

    const res = await fetch('http://localhost:3000/api/paciente/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: this.nombre,
        apellido: this.apellido,
        direccion: this.direccion,
        edad: this.edad,
        cedula: this.cedula,
        correo: this.correo,
        contrasena: this.contrasena
      })
    });
    const data = await res.json();
    if (data.success) {
      this.mensaje = 'Registro exitoso. Ahora puede iniciar sesión.';
      this.tipoMensaje = 'exito';
      setTimeout(() => {
        this.router.navigate(['/pacientelogin']);
      }, 1500);
    } else {
      this.mensaje = 'Error: ' + data.message;
      this.tipoMensaje = 'error';
    }
  }
}
