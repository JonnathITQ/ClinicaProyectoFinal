const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Usa el modelo de usuarios
const jwt = require('jsonwebtoken');

// Ruta de login para doctores
router.post('/login', async (req, res) => {
  let { correo, contraseña } = req.body;
  console.log('Correo recibido:', correo);
  console.log('Contraseña recibida:', contraseña);

  if (!correo || !contraseña) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
  }
  correo = correo.trim().toLowerCase();

  const doctor = await Usuario.findOne({
    rol: 'doctor',
    $or: [
      { correo: { $regex: new RegExp(`^${correo}$`, 'i') } },
      { correo_institucional: { $regex: new RegExp(`^${correo}$`, 'i') } }
    ]
  });
  console.log('Doctor encontrado:', doctor);

  if (!doctor) {
    return res.status(401).json({ success: false, message: 'Doctor no encontrado.' });
  }
  if (contraseña !== doctor.contraseña) {
    return res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
  }
  const token = jwt.sign({ id: doctor._id, rol: doctor.rol }, 'tu_clave_secreta', { expiresIn: '1d' });
  res.json({ success: true, token });
});

module.exports = router;