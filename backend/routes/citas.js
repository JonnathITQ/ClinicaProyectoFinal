const express = require('express');
const router = express.Router();
const Cita = require('../models/citas');
const Doctor = require('../models/doctor');
const Servicio = require('../models/servicios');
const Paciente = require('../models/paciente');

// Crear nueva cita
router.post('/', async (req, res) => {
  const { id_paciente, id_doctor, id_servicio, fecha_cita, hora_inicio, estado, notas } = req.body;

  // Busca los documentos por el campo numérico
  const paciente = await Paciente.findOne({ id_paciente });
  const doctor = await Doctor.findOne({ id_doctor });
  const servicio = await Servicio.findOne({ id_servicio });

  // Log para depuración
  console.log('Paciente:', paciente);
  console.log('Doctor:', doctor);
  console.log('Servicio:', servicio);

  // Validación
  if (!paciente || !doctor || !servicio) {
    return res.status(400).json({ success: false, message: 'Doctor, servicio o paciente no encontrado.' });
  }

  // Crea la cita usando los ObjectId
  const id_cita = Date.now();
  const nuevaCita = new Cita({
    id_cita,
    id_paciente: paciente._id,
    id_doctor: doctor._id,
    id_servicio: servicio._id,
    fecha_cita,
    hora_inicio,
    hora_fin: '',
    estado: estado || 'pendiente',
    notas: notas || '',
    fecha_creacion: new Date()
  });

  try {
    await nuevaCita.save();
    res.json({ success: true, cita: nuevaCita });
  } catch (err) {
    console.error('Error al guardar cita:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('id_paciente')
      .populate('id_doctor')
      .populate('id_servicio');
    res.json(citas);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener citas.' });
  }
});

module.exports = router;