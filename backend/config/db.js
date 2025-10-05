const mongoose = require('mongoose');

const uri = 'mongodb+srv://alejo:alejo@cluster0.o5halzu.mongodb.net/ProyectoAngular?retryWrites=true&w=majority';

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos ProyectoAngular');
});

module.exports = db;