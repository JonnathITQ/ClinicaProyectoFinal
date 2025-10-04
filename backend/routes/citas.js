const express = require('express');
const router = express.Router();
const Cita = require('../models/citas');
const Usuario = require('../models/usuarios');

function generarHoras() {
  return [
    { hora_inicio: '09:00', hora_fin: '10:00' },
    { hora_inicio: '10:00', hora_fin: '11:00' },
    { hora_inicio: '11:00', hora_fin: '12:00' },
    { hora_inicio: '14:00', hora_fin: '15:00' },
    { hora_inicio: '15:00', hora_fin: '16:00' }
  ];
}

// Genera doctores si no existen
async function asegurarDoctores() {
  const doctores = await Usuario.find({ rol: 'doctor' });
  if (doctores.length === 0) {
    const nuevosDoctores = [
      { nombre: 'Juan', apellido: 'Pérez', correo: 'juan@clinica.com', contraseña: 'doctor123', rol: 'doctor' },
      { nombre: 'Ana', apellido: 'Gómez', correo: 'ana@clinica.com', contraseña: 'doctor123', rol: 'doctor' }
    ];
    await Usuario.insertMany(nuevosDoctores);
    return await Usuario.find({ rol: 'doctor' });
  }
  return doctores;
}

// Ruta para obtener citas disponibles por doctor
router.get('/disponibles', async (req, res) => {
  const hoy = new Date();
  const fechas = [];
  for (let i = 0; i < 5; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    fechas.push(fecha.toISOString().slice(0, 10));
  }

  // Asegura que hay doctores
  const doctores = await asegurarDoctores();

  // Busca citas disponibles por cada doctor
  let citas = await Cita.find({
    estado: 'disponible',
    fecha_cita: { $in: fechas }
  }).populate('doctor');

  // Si no hay citas, créalas para cada doctor
  if (citas.length === 0) {
    let nuevasCitas = [];
    for (const doctor of doctores) {
      for (const fecha of fechas) {
        for (const hora of generarHoras()) {
          nuevasCitas.push(new Cita({
            fecha_cita: fecha,
            hora_inicio: hora.hora_inicio,
            hora_fin: hora.hora_fin,
            estado: 'disponible',
            doctor: doctor._id
          }));
        }
      }
    }
    await Cita.insertMany(nuevasCitas);
    citas = await Cita.find({
      estado: 'disponible',
      fecha_cita: { $in: fechas }
    }).populate('doctor');
  }

  res.json(citas);
});

// Reservar una cita
router.post('/reservar', async (req, res) => {
  const { citaId, pacienteId } = req.body;
  try {
    await Cita.findByIdAndUpdate(citaId, { estado: 'ocupada', paciente: pacienteId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'No se pudo reservar la cita.' });
  }
});

module.exports = router;