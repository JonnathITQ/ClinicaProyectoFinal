import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente-login.html',
  styleUrl: './paciente-login.css'
})
export class PacienteLogin {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  correo: string = '';
  contrasena: string = '';

  public router: Router; // Cambia de private a public

  constructor(router: Router) {
    this.router = router;
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    this.mensaje = '';
    this.tipoMensaje = '';

    const res = await fetch('http://localhost:3000/api/paciente/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: this.correo, contrasena: this.contrasena })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      this.mensaje = 'Login exitoso';
      this.tipoMensaje = 'exito';
      setTimeout(() => {
        this.router.navigate(['/modulopaciente']);
      }, 1200);
    } else {
      this.mensaje = 'Error: ' + data.message;
      this.tipoMensaje = 'error';
    }
  }
}
