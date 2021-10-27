const express = require('express');

const {VehiculosAPI} = require('./src/vehiculos/index');

const app = express();

app.use(express.json());

VehiculosAPI(app);


app.listen(3000, console.log("Escuchando en puerto 3000"));