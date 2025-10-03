const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);