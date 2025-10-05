const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  id_cita: { type: Number, unique: true },
  id_paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
  id_doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  id_servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' },
  fecha_cita: String,
  hora_inicio: String,
  hora_fin: String,
  estado: String,
  notas: String,
  fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'citas' });

module.exports = mongoose.model('Cita', CitaSchema);