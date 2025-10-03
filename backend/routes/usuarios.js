const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Crear usuario
router.post('/', async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json(usuario);
});

module.exports = router;