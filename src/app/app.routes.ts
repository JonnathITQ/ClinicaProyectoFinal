import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';
import { DoctorLogin } from './logins/doctor-login/doctor-login';
import { PacienteLogin } from './logins/paciente-login/paciente-login';
import { Doctor } from './modulo/doctor/doctor';
import { Paciente } from './modulo/paciente/paciente';
import { Acercade } from './pages/acercade/acercade';
import { Contacto } from './pages/contacto/contacto';
import { Servicios } from './pages/servicios/servicios';

export const routes: Routes = [

    {path: '', component: Inicio},
    {path: 'sidebar', component: Sidebar},
    {path: 'footer', component: Footer},
    {path: 'doctorlogin', component: DoctorLogin},
    {path: 'pacientelogin', component: PacienteLogin},
    {path: 'modulodoctor', component: Doctor},
    {path: 'modulopaciente', component: Paciente},
    {path: 'about', component: Acercade},
    {path: 'contacto', component: Contacto},
    {path: 'servicios', component: Servicios},
    {path: '**', redirectTo: ''}
];
