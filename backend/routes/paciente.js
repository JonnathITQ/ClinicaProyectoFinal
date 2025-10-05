const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');

// Validaciones
function validarPaciente(data) {
  const errores = [];

  // Nombre y apellido solo letras
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(data.nombre)) {
    errores.push('El nombre solo debe contener letras.');
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(data.apellido)) {
    errores.push('El apellido solo debe contener letras.');
  }

  // Edad solo números
  if (!/^\d+$/.test(String(data.edad))) {
    errores.push('La edad solo debe contener números.');
  }

  // Cédula: solo números y 10 dígitos
  if (!/^\d{10}$/.test(data.cedula)) {
    errores.push('La cédula debe tener exactamente 10 números.');
  }

  // Correo formato válido
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errores.push('El correo no tiene un formato válido.');
  }

  return errores;
}

// Registro de paciente
router.post('/register', async (req, res) => {
  const errores = validarPaciente(req.body);
  if (errores.length > 0) {
    return res.json({ success: false, message: errores.join(' ') });
  }

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
  const paciente = await Paciente.findOne({ correo, contraseña: contrasena });
  if (!paciente) {
    return res.json({ success: false, message: 'Credenciales incorrectas.' });
  }
  // Si usas JWT, genera el token aquí
  res.json({ success: true, paciente, token: '...' });
});

module.exports = router;