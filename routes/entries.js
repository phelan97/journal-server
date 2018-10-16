
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/user');
const Entry = require('../models/entry');
const {validateIds, requireFields} = require('../utils/server-validation');

const router = express.Router();

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
  const {id: userId} = req.user;

  return Entry.find({id: userId}).limit(20)
    .then(results => {
      return res.json(results);
    })
    .catch(err => next(err));

});

router.get('/:id', validateIds, (req, res, next) => {
  const {id} = req.params;
  const {id: userId} = req.user;

  return Entry.findOne({_id: id, userId})
    .then(result => {
      if(!result) {
        const err = new Error('Could not find an entry with the given id');
        err.status = 404;
        return next(err);
      }
      return res.json(result);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const {content} = req.body;
  const {id: userId} = req.user;
  const newEntry = {
    content,
    userId
  };
  Entry.create(newEntry)
    .then(data => {
      res.location(`${req.originalUrl}/${data.id}`).status(201).json(data);
    }).catch(err => next(err));
});

router.delete('/', (req, res, next) => {
  const {id: userId} = req.user;
});

module.exports = router;