const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  id_doctor: { type: Number, unique: true }, // Clave primaria lógica
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: String,
  cedula: String,
  direccion: String,
  edad: Number,
  especialidad: String,
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'doctor' });

module.exports = mongoose.model('Doctor', DoctorSchema);