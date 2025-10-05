const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');

// Registro de paciente
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, cedula, direccion, edad } = req.body;
    const existe = await Paciente.findOne({ correo });
    if (existe) {
      return res.json({ success: false, message: 'El correo ya está registrado.' });
    }
    const nuevoPaciente = new Paciente({
      id_paciente: Date.now(), // Genera un id único
      nombre,
      apellido,
      correo,
      contraseña: contrasena,
      rol: 'paciente',
      cedula,
      direccion,
      edad,
      fecha_creacion: new Date()
    });
    await nuevoPaciente.save();
    res.json({ success: true, paciente: nuevoPaciente });
  } catch (err) {
    console.error('Error al registrar paciente:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
});

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