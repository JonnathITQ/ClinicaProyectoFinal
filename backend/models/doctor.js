const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: { type: String, default: 'doctor' },
  cedula: String,
  direccion: String,
  especialidad: String,
  edad: Number,
  fecha_creacion: Date,
  fecha_actualizacion: Date
});

module.exports = mongoose.model('Doctor', DoctorSchema);