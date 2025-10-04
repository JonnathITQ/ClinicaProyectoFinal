import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperacion-paciente',
  imports: [RouterModule, CommonModule],
  templateUrl: './recuperacion-paciente.html',
  styleUrl: './recuperacion-paciente.css'
})
export class RecuperacionPaciente {
  mensaje: string = '';
  tipoMensaje: 'error' | 'exito' | '' = '';

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nombre = (form['nombre'] as HTMLInputElement).value.trim();
    const apellido = (form['apellido'] as HTMLInputElement).value.trim();
    const correo = (form['correo'] as HTMLInputElement).value.trim();
    const cedula = (form['cedula'] as HTMLInputElement).value.trim();

    // Validación básica
    if (!nombre || !apellido || !correo || !cedula) {
      this.mensaje = 'Todos los campos son obligatorios.';
      this.tipoMensaje = 'error';
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      this.mensaje = 'Ingrese un correo electrónico válido.';
      this.tipoMensaje = 'error';
      return;
    }

    // Validación de cédula
    if (!/^\d{10}$/.test(cedula)) {
      this.mensaje = 'La cédula tiene 10 dígitos';
      this.tipoMensaje = 'error';
      return;
    }

    // Validación de solo letras en nombre y apellido
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!soloLetras.test(nombre)) {
      this.mensaje = 'El nombre debe contener solo letras';
      this.tipoMensaje = 'error';
      return;
    }
    if (!soloLetras.test(apellido)) {
      this.mensaje = 'El apellido debe contener solo letras';
      this.tipoMensaje = 'error';
      return;
    }

    // Notificación de proceso
    this.mensaje = 'Verificando proceso...';
    this.tipoMensaje = 'exito';
    setTimeout(() => {
      this.mensaje = 'Se ha enviado un código a su correo electrónico';
      this.tipoMensaje = 'exito';
    }, 2000);
  }
}
