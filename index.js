// Sintaxis common js
// const express = require('express');
import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config({path: "variables.env"});

// Conectar la base de datos
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(error => console.log(error))

// Habilitar PUG
app.set('view engine', 'pug');

// Obtiene el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes"
  // Si no pasa al siguiente middleware usar: return next
  next();
})

// Define carpeta pública
app.use(express.static('public'));

// Agrega Router
app.use('/', router);

// Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
})