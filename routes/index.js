'use strict';
var express = require('express');

const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');


});

module.exports = router;
