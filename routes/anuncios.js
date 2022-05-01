'use strict';

const express = require('express');
const Anuncio = require('../models/Anuncio');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { buildAnuncioFilterFromReq } = require('../lib/utils');

/* GET anuncios page. */
router.get('/', asyncHandler(async function (req, res) {
  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';
  const includeTotal = true;

  const filters = buildAnuncioFilterFromReq(req);
  const {total, rows} = await Anuncio.list(filters, start, limit, sort, includeTotal);

  res.render('anuncios', { total, anuncios: rows });

}));




module.exports = router;
