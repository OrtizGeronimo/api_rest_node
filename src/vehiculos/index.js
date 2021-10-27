const express = require("express");

const router = express.Router();
const rutasProtegidas = express.Router();

const jwt = require('jsonwebtoken');

const { VehiculosController } = require('./controller');




module.exports.VehiculosAPI = (app) => {
    
   
   router
  .post("/login", VehiculosController.login)
  .get("/validate", VehiculosController.validate)
  .get("/vehicles",rutasProtegidas, VehiculosController.getAll)
  .get("/vehicles/:id",rutasProtegidas, VehiculosController.getOne)
  .delete("/vehicles/:id",rutasProtegidas, VehiculosController.deleteOne)
  .post("/vehicles",rutasProtegidas , VehiculosController.create);


   rutasProtegidas.use((req, res, next) => {
       const token = req.headers.authorization;
       if (token) {
         jwt.verify(token, "123", (err, decoded) => {      
           if (err) {
             return res.json({ mensaje: 'Token inválida' });    
           } else {
             req.decoded = decoded;    
             next();
           }
         });
       } else {
         res.send({ 
             mensaje: 'Token no proveída.' 
         });
       }
    });
  
  
   
    app.use("/api/kiltex",router);
};
