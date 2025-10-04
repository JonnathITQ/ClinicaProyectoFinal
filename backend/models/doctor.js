const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: { type: String, default: 'doctor' }
});

module.exports = mongoose.model('Doctor', DoctorSchema);