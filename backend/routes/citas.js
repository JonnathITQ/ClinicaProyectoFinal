const express = require('express');
const router = express.Router();
const Cita = require('../models/citas');

router.get('/', async (req, res) => {
  const citas = await Cita.find();
  res.json(citas);
});

router.post('/', async (req, res) => {
  const cita = new Cita(req.body);
  await cita.save();
  res.json(cita);
});

module.exports = router;