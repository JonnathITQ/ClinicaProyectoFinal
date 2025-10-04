import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from "./components/sidebar/sidebar";
import { Footer } from "./components/footer/footer";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ClinicaDental');

  constructor(private router: Router) {}

  get ocultarNavSidebar(): boolean {
    // Aqui se pone las rutas en las cuales se va a ocultar la navbar y sidebar
    return this.router.url.startsWith('/doctorlogin')
      || this.router.url.startsWith('/pacientelogin')
      || this.router.url.startsWith('/recuperaciondoctor')
      || this.router.url.startsWith('/recuperacionpaciente')
      || this.router.url.startsWith('/registropaciente')
      || this.router.url.startsWith('/modulopaciente')
      || this.router.url.startsWith('/modulodoctor');
  }
}
