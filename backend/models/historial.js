const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
  id_historial: { type: Number, unique: true }, // Clave primaria lógica
  id_paciente: { type: Number, ref: 'Paciente' },
  id_doctor: { type: Number, ref: 'Doctor' },
  id_cita: { type: Number, ref: 'Cita' },
  diagnostico: String,
  notas: String,
  prescripciones: [String],
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'historial' });

module.exports = mongoose.model('Historial', HistorialSchema);