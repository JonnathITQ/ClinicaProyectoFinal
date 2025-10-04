const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
  }
  try {
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña,
      rol: 'paciente'
    });
    await nuevoUsuario.save();
    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  if (!correo || !contraseña) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
  }
  try {
    const usuario = await Usuario.findOne({ correo }); // <-- Cambia aquí
    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
    if (usuario.rol !== 'paciente') {
      return res.status(403).json({ success: false, message: 'Solo los pacientes pueden iniciar sesión aquí' });
    }
    if (contraseña !== usuario.contraseña) { // <-- Cambia aquí
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
      'tu_secreto_jwt',
      { expiresIn: '2h' }
    );
    res.json({ success: true, token, usuario: { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;