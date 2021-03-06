const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const routes = express.Router();



routes.post('/boxes', BoxController.store);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);
routes.get('/boxes/:id', BoxController.show);


//Exporta as informações do arquivo
module.exports = routes; 