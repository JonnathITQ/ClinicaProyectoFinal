const express = require('express');
const router = express.Router();
const HistorialMedico = require('../models/historial_medico');

router.get('/', async (req, res) => {
  const historial = await HistorialMedico.find();
  res.json(historial);
});

router.post('/', async (req, res) => {
  const historial = new HistorialMedico(req.body);
  await historial.save();
  res.json(historial);
});

module.exports = router;