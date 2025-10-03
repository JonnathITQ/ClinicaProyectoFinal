const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' },
  fecha: Date,
  estado: String,
});

module.exports = mongoose.model('Cita', CitaSchema);