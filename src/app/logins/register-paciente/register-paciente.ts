import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-paciente',
  imports: [RouterModule, CommonModule],
  templateUrl: './register-paciente.html',
  styleUrl: './register-paciente.css'
})
export class RegisterPaciente {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nombre = (form['nombre'] as HTMLInputElement).value;
    const correo = (form['correo'] as HTMLInputElement).value;
    const contraseña = (form['contraseña'] as HTMLInputElement).value;

    // Envía los datos al backend
    const res = await fetch('http://localhost:3000/api/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, contraseña })
    });
    const data = await res.json();
    if (data.success) {
      this.mensaje = 'Registro exitoso. Ahora puede iniciar sesión.';
      this.tipoMensaje = 'exito';
      setTimeout(() => {
        window.location.href = '/pacientelogin';
      }, 1500);
    } else {
      this.mensaje = 'Error: ' + data.message;
      this.tipoMensaje = 'error';
    }
  }
}
