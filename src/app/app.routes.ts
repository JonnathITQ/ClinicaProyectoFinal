import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { DoctorLogin } from './logins/doctor-login/doctor-login';
import { PacienteLogin } from './logins/paciente-login/paciente-login';
import { Doctor } from './modulo/doctor/doctor';
import { Paciente } from './modulo/paciente/paciente';
import { Acercade } from './pages/acercade/acercade';
import { Contacto } from './pages/contacto/contacto';
import { Servicios } from './pages/servicios/servicios';
import { RecuperacionPaciente } from './logins/recuperacion-paciente/recuperacion-paciente';
import { RegisterPaciente } from './logins/register-paciente/register-paciente';
import { RecuperacionDoctor } from './logins/recuperacion-doctor/recuperacion-doctor';
import { AdminLogin } from './logins/admin-login/admin-login';
import { Admin } from './modulo/admin/admin';

export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'doctorlogin', component: DoctorLogin},
    {path: 'pacientelogin', component: PacienteLogin},
    {path: 'modulodoctor', component: Doctor},
    {path: 'modulopaciente', component: Paciente},
    {path: 'about', component: Acercade},
    {path: 'contacto', component: Contacto},
    {path: 'servicios', component: Servicios},
    {path: 'recuperacionpaciente', component: RecuperacionPaciente},
    {path: 'recuperaciondoctor', component: RecuperacionDoctor},
    {path: 'registropaciente', component: RegisterPaciente},
    {path: 'adminlogin', component: AdminLogin},
    {path: 'admincrud', component: Admin},
    {path: '**', redirectTo: ''}
];
