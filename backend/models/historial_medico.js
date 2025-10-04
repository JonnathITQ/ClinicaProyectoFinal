const mongoose = require('mongoose');

const HistorialMedicoSchema = new mongoose.Schema({
  id_historial: Number,
  id_paciente: Number,
  id_doctor: Number,
  id_cita: Number,
  diagnóstico: String,
  notas: String,
  prescripciones: [String], 
  fecha_creación: Date      
});

module.exports = mongoose.model('HistorialMedico', HistorialMedicoSchema);