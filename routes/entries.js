
const express = require('express');
const User = require('../models/user');
const Entry = require('../models/entry');

const router = express.Router();

router.get('/', (req, res, next) => {
  // TODO: add filtering
  const {userId} = req.user;

  return Entry.find({userId}).limit(20)
    .then(results => {
      return res.json(results);
    })
    .catch(err => next(err));

});

router.get('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports = router;