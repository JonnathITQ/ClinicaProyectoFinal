import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // <-- Agrega esto

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule] // <-- Agrega RouterModule
})
export class AdminLogin {
  correo: string = '';
  contrasena: string = '';
  notificacion: string = '';
  notificacionColor: string = '';

  constructor(private http: HttpClient, private router: Router) {} // <-- Agrega Router

  onSubmit() {
    this.http.post('http://localhost:3000/api/admin/login', {
      correo: this.correo,
      contrasena: this.contrasena
    }).subscribe({
      next: (res: any) => {
        this.notificacion = 'Usuario correcto, bienvenido.';
        this.notificacionColor = 'green';
        setTimeout(() => {
          this.router.navigate(['/admincrud']); // <-- Redirige a admin.html
        }, 1200); // Espera 1.2 segundos para mostrar la notificación
      },
      error: (err) => {
        this.notificacion = err?.error?.message || 'Correo o contraseña incorrectos';
        this.notificacionColor = 'red';
      }
    });
  }
}
