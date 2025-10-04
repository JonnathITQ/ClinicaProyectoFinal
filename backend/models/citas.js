const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  id_cita: Number,
  id_paciente: Number,
  id_doctor: Number,
  id_servicio: Number,
  fecha_cita: String,         // o Date si prefieres manejar fechas
  hora_inicio: String,        // o Date
  hora_fin: String,           // o Date
  estado: String,
  notas: String,
  fecha_creación: Date,
  fecha_actualización: Date
});

module.exports = mongoose.model('Cita', CitaSchema);