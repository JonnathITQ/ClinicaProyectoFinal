const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

// Obtener todos los doctores
router.get('/', async (req, res) => {
  const doctores = await Doctor.find();
  res.json(doctores);
});

// Crear doctor
router.post('/', async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json(doctor);
});


// Ruta de login para doctor
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const doctor = await Doctor.findOne({ correo });
    if (!doctor) {
      return res.status(401).json({ success: false, message: 'Doctor no encontrado' });
    }
    if (doctor.rol !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Solo los doctores pueden iniciar sesión aquí' });
    }
    if (contraseña !== doctor.contraseña) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { id: doctor._id, correo: doctor.correo, rol: doctor.rol },
      'tu_secreto_jwt',
      { expiresIn: '2h' }
    );
    res.json({ success: true, token, doctor: { nombre: doctor.nombre, correo: doctor.correo, rol: doctor.rol } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;