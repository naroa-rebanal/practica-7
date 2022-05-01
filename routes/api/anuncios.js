'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const Anuncio = mongoose.model('Anuncio');
const { buildAnuncioFilterFromReq } = require('../../lib/utils');
const { Requester } = require('cote');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/anuncios')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

const requester = new Requester({name: 'thumbs'});



// Return the list of anuncio
router.get('/', (req, res, next) => {

  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';
  const includeTotal = req.query.includeTotal === 'true';

  const filters = buildAnuncioFilterFromReq(req);

  // Ejemplo hecho con callback, aunque puede hacerse mejor con promesa y await
  Anuncio.list(filters, start, limit, sort, includeTotal, function (err, anuncios) {
    if (err) return next(err);
    res.json({ result: anuncios });
  });
});

// Return the list of available tags
router.get('/tags', asyncHandler(async function (req, res) {
  const distinctTags = await Anuncio.distinct('tags');
  res.json({ result: distinctTags });
}));

// Create
router.post('/', upload.single('foto'), asyncHandler(async (req, res) => {

  const anuncioData = req.body;
  anuncioData.foto = req.file.filename; 

  const anuncio = new Anuncio(anuncioData);

  const anuncioGuardado = await anuncio.save();


  const evento = {
    type: 'make-thumbnail',
    
   imageName: anuncioGuardado.foto,
    };

  res.json({ result: anuncioGuardado });

  requester.send( evento, resultado => {
    console.log('Thumbnail creado con el nombre:', resultado)
   });

}));

module.exports = router;
