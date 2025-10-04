const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,      
  correo: String,        
  contraseña: String,    
  rol: String,
  cedula: String,        
  direccion: String,     
  edad: Number,          
  fecha_creacion: Date,  
  fecha_actualizacion: Date 
});

module.exports = mongoose.model('Usuario', UsuarioSchema);