const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./config/db'); // Conexión a la base de datos

const app = express();
app.use(cors());
app.use(express.json());

// Importa las rutas (debes crearlas en backend/routes)
const citasRoutes = require('./routes/citas');
const disponibilidadRoutes = require('./routes/disponibilidad');
const doctorRoutes = require('./routes/doctor');
const historialRoutes = require('./routes/historial');
const pacienteRoutes = require('./routes/paciente');
const serviciosRoutes = require('./routes/servicios');

// Usa las rutas
app.use('/api/citas', citasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/servicios', serviciosRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});