const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  id_admin: { type: Number, unique: true }, // Clave primaria lógica
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'admin' });

module.exports = mongoose.model('Admin', AdminSchema);