const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
const usuariosRouter = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/historial_medico', require('./routes/historial_medico'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/doctores', require('./routes/doctor'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});