const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema({
  id_servicio: { type: Number, unique: true }, // Clave primaria lógica
  nombre: String,
  descripcion: String,
  duracion_minutos: Number,
  precio: Number,
  activo: Boolean
}, { collection: 'servicios' });

module.exports = mongoose.model('Servicio', ServicioSchema);