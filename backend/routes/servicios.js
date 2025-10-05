const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicios');

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;