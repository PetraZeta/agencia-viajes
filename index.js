//const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

//conectar bd
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next(); //para que pase al siguente 
});

//agregar body parset para leer los datos dl formulario
app.use(express.urlencoded({ extend: true }));


//definir la carpeta publica
app.use(express.static('public'));

//agregar router a app
app.use('/', router);

app.listen(port, () => {
    console.groupCollapsed(`El servidor esta funcionando por el puerto ${port}`)
})