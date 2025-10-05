const mongoose = require('mongoose');

const DisponibilidadDiaSchema = new mongoose.Schema({
  fecha: String,
  horas: [String]
});

const DisponibilidadDoctorSchema = new mongoose.Schema({
  id_doctor: { type: Number, ref: 'Doctor' }, // Relación con Doctor
  disponibilidad: [DisponibilidadDiaSchema]
}, { collection: 'disponibilidad' });

module.exports = mongoose.model('DisponibilidadDoctor', DisponibilidadDoctorSchema);