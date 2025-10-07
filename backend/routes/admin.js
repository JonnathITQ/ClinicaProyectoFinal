const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  // Validación de campos vacíos
  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
  }

  // Buscar admin por correo y contraseña
  const admin = await Admin.findOne({ correo, contraseña: contrasena });
  if (admin) {
    res.json({ mensaje: 'Login correcto' });
  } else {
    res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }
});

module.exports = router;