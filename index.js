const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./DataBase/config');

const app = express();
// Base de datos
dbConnection();

//console.log(//process.env);
//rutas
app.get('/', (req, resp) => {
    // resp.status(400).json({ ok: true, msg: 'listo' });
    resp.json({ ok: true, msg: 'listo' });
});

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en el puerto ", process.env.PORT);
});