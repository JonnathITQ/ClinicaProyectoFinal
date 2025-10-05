const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Login de doctor
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const doctor = await Doctor.findOne({ correo, contraseña });
    if (!doctor) {
      return res.json({ success: false, message: 'Credenciales incorrectas.' });
    }
    // Aquí puedes generar un token si lo necesitas
    res.json({ success: true, token: 'doctor-token', doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

module.exports = router;