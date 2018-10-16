
const express = require('express');
const User = require('../models/user');
const Entry = require('../models/entry');

const router = express.Router();

const passport = require('passport');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  console.log('reached /api/entries');
  if(!req.user) {
    console.log('req.user is not set');
    console.log('skipping route');
    return next();
  }
  console.log('req.user is set');
  console.log('req.user contents: ', req.user);


  // TODO: add filtering
  const {userId} = req.user;

  // FIXME: _id
  return Entry.find({_id: userId}).limit(20)
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