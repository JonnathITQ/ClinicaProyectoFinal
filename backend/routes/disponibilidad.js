const express = require('express');
const router = express.Router();
const DisponibilidadDoctor = require('../models/disponibilidad');

// Obtener todas las disponibilidades
router.get('/', async (req, res) => {
  try {
    const disponibilidad = await DisponibilidadDoctor.find();
    res.json(disponibilidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;