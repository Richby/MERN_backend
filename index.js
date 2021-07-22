const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

//console.log( process.env );

//Directorio público
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json());

//Rutas
//app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth') );

//TODO: CRUD: Eventos


//Escuchar peticiones
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});