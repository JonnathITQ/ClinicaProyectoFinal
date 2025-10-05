const express = require('express');
const router = express.Router();
const Cita = require('../models/citas');

// Crear nueva cita
router.post('/', async (req, res) => {
  try {
    const {
      id_paciente,
      id_doctor,
      id_servicio,
      fecha_cita,
      hora_inicio,
      estado,
      notas
    } = req.body;

    // Genera un id único para la cita
    const id_cita = Date.now();

    const nuevaCita = new Cita({
      id_cita,
      id_paciente,
      id_doctor,
      id_servicio,
      fecha_cita,
      hora_inicio,
      hora_fin: '', // Puedes calcular la hora de fin si lo necesitas
      estado: estado || 'pendiente',
      notas: notas || '',
      fecha_creacion: new Date()
    });

    await nuevaCita.save();
    res.json({ success: true, cita: nuevaCita });
  } catch (err) {
    console.error('Error al guardar cita:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

module.exports = router;