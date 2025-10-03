const mongoose = require('mongoose');

const HistorialMedicoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fecha: Date,
  descripcion: String,
});

module.exports = mongoose.model('HistorialMedico', HistorialMedicoSchema);