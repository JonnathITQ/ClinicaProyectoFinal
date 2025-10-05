const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');

// Login de paciente
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const paciente = await Paciente.findOne({ correo, contraseña: contrasena });
    if (!paciente) {
      return res.json({ success: false, message: 'Credenciales incorrectas.' });
    }
    // Aquí puedes generar un token si lo necesitas
    res.json({ success: true, token: 'paciente-token', paciente });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

module.exports = router;