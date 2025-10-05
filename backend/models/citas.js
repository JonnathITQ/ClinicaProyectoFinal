const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  id_cita: { type: Number, unique: true }, // Clave primaria lógica
  id_paciente: { type: Number, ref: 'Paciente' },
  id_doctor: { type: Number, ref: 'Doctor' },
  id_servicio: { type: Number, ref: 'Servicio' },
  fecha_cita: String,
  hora_inicio: String,
  hora_fin: String,
  estado: String,
  notas: String,
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'citas' });

module.exports = mongoose.model('Cita', CitaSchema);