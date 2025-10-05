import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.html',
  styleUrls: ['./doctor-login.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DoctorLogin {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  correo: string = '';
  contrasena: string = ''; // Cambia aquí

  constructor(private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.correo.trim() || !this.contrasena) { // Cambia aquí
      this.mensaje = 'Debe ingresar correo y contraseña.';
      this.tipoMensaje = 'error';
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: this.correo.trim(), contraseña: this.contrasena }) // Cambia aquí
      });

      const data = await res.json();
      if (data.success) {
        this.mensaje = 'Ingreso exitoso';
        this.tipoMensaje = 'exito';
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          this.router.navigate(['/modulodoctor']);
        }, 1200);
      } else {
        this.mensaje = data.message || 'Credenciales incorrectas.';
        this.tipoMensaje = 'error';
      }
    } catch (error) {
      this.mensaje = 'No se pudo conectar con el servidor.';
      this.tipoMensaje = 'error';
    }
  }
}
