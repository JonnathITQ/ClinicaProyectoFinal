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

// Endpoint GET para obtener todos los doctores
router.get('/', async (req, res) => {
  try {
    const doctores = await Doctor.find();
    res.json(doctores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear doctor
router.post('/', async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol, cedula, direccion, edad, especialidad } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellido || !correo || !contraseña) {
    return res.status(400).json({ error: 'Nombre, apellido, correo y contraseña son obligatorios.' });
  }
  if (typeof edad !== 'number' || edad < 18) {
    return res.status(400).json({ error: 'La edad debe ser un número mayor o igual a 18.' });
  }
  try {
    // Validar correo único
    const existe = await Doctor.findOne({ correo });
    if (existe) {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el doctor.' });
  }
});

// Actualizar doctor
router.put('/:id', async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol, cedula, direccion, edad, especialidad } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellido || !correo || !contraseña) {
    return res.status(400).json({ error: 'Nombre, apellido, correo y contraseña son obligatorios.' });
  }
  if (typeof edad !== 'number' || edad < 18) {
    return res.status(400).json({ error: 'La edad debe ser un número mayor o igual a 18.' });
  }
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor no encontrado.' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el doctor.' });
  }
});

// Eliminar doctor
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor no encontrado.' });
    }
    res.json({ message: 'Doctor eliminado correctamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el doctor.' });
  }
});

module.exports = router;