const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema({
  id_servicio: Number,
  nombre: String,
  descripción: String,  
  duracion_minutos: Number,
  precio: Number,
  activo: Boolean
});

module.exports = mongoose.model('Servicio', ServicioSchema);