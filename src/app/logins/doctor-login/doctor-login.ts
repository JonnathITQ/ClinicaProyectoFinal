import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-doctor-login',
  imports: [CommonModule], 
  templateUrl: './doctor-login.html',
  styleUrl: './doctor-login.css'
})
export class DoctorLogin {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  constructor(private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const correo = (form['correo'] as HTMLInputElement).value.trim();
    const contraseña = (form['password'] as HTMLInputElement).value;

    if (!correo || !contraseña) {
      this.mensaje = 'Debe ingresar correo y contraseña.';
      this.tipoMensaje = 'error';
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/doctores/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
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
