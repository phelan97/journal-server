
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/user');
const Entry = require('../models/entry');
const {validateIds, requireFields} = require('../utils/server-validation');

const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const {id: userId} = req.user;
  const {filter} = req.query;

  const dbFilter = {userId};
  if(filter) {
    dbFilter.content = {$regex: filter, $options: 'i'};
  }

  // FIXME: don't hardcode the limit
  return Entry.find(dbFilter).limit(1000)
    .then(results => {
      return res.json(results.map(result => result.toObject()));
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

router.post('/', requireFields(['content']), (req, res, next) => {
  const {content} = req.body;
  const {id: userId} = req.user;
  const newEntry = {
    content,
    userId
  };
  Entry.create(newEntry)
    .then(data => {
      // FIXME: toObject has to be called here
      res.location(`${req.originalUrl}/${data.id}`).status(201).json(data.toObject());
    }).catch(err => next(err));
});

router.put('/:id', requireFields(['content']), validateIds, (req, res, next) => {
  const {content} = req.body;
  const {id: userId} = req.user;
  const updatedObj = {
    content
  };
  Entry.findOneAndUpdate({_id: req.params.id, userId}, updatedObj, {new: true})
    .then(updatedEntry => {
      return res.json(updatedEntry);
    })
    .catch(err => next(err));
});

router.delete('/:id', validateIds, (req, res, next) => {
  const {id: userId} = req.user;
  Entry.findOneAndRemove({_id: req.params.id, userId})
    .then(() => res.status(204).end())
    .catch(err => next(err));
});

module.exports = router;