require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./DataBase/config');




//INICIANDO EL SERVIDOR WEB
const app = express();

//CONFIGURANDO CORS
app.use(cors());

//lectura del body
app.use(express.json());

// INICIANDO CONEXIÓN A LA BD DE MONGO ATLAS
dbConnection();

//DEFINIENDO LA RUTA POR DEFECTO PARA USUARIOS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



//PONIENDO A ESCUCHAR EL SERVIDOR EN EL PUERTO CONFIGURADO EN LAS VARIABLES DE ENTORNO DE NODE
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en el puerto ", process.env.PORT);
});