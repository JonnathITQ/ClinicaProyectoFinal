const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  id_paciente: { type: Number, unique: true }, // Clave primaria lógica
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: String,
  cedula: String,
  direccion: String,
  edad: Number,
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'paciente' });

module.exports = mongoose.model('Paciente', PacienteSchema);