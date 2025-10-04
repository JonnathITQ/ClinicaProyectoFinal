const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema({
  id_servicio: Number,
  nombre: String,
  descripción: String,        // <-- con tilde, igual que en la base de datos
  duracion_minutos: Number,
  precio: Number,
  activo: Boolean
});

module.exports = mongoose.model('Servicio', ServicioSchema);