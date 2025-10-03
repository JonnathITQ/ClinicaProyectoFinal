const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicios');

router.get('/', async (req, res) => {
  const servicios = await Servicio.find();
  res.json(servicios);
});

router.post('/', async (req, res) => {
  const servicio = new Servicio(req.body);
  await servicio.save();
  res.json(servicio);
});

module.exports = router;