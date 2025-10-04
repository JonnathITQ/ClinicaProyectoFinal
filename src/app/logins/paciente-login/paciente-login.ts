import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule

@Component({
  selector: 'app-paciente-login',
  imports: [RouterModule, CommonModule], // <-- Agrega CommonModule aquí
  templateUrl: './paciente-login.html',
  styleUrl: './paciente-login.css'
})
export class PacienteLogin {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const correo = (form['correo'] as HTMLInputElement).value;
    const password = (form['password'] as HTMLInputElement).value;

    // Limpiar mensaje antes de enviar
    this.mensaje = '';
    this.tipoMensaje = '';

    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: correo, contraseña: password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      this.mensaje = 'Login exitoso';
      this.tipoMensaje = 'exito';
      setTimeout(() => {
        window.location.href = '/modulopaciente';
      }, 1200);
    } else {
      this.mensaje = 'Error: ' + data.message;
      this.tipoMensaje = 'error';
    }
  }
}
