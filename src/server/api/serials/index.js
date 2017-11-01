'use strict';

var express = require('express');
var controller = require('./serials.controller');

var router = express.Router();

router.get('/search', controller.search)
router.get('/list', controller.list)
router.get('/add/:id', controller.add)
router.get('/get/:id', controller.get)
router.get('/download/:id/:season/:episode', controller.download)


export default router;
