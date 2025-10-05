import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  mensajeNotificacion: string = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const notificacion = localStorage.getItem('notificacion');
      if (notificacion) {
        this.mensajeNotificacion = notificacion;
        // Borra el mensaje después de mostrarlo
        localStorage.removeItem('notificacion');
      }
    }
  }
}
