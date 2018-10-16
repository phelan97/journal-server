

const User = require('../models/user');

const express = require('express');
const router = express.Router();

const {requireFields} = require('../utils/server-validation');

router.post('/', requireFields(['email','password']), (req, res, next) => {
  const {email, password} = req.body;

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        email,
        password: digest,
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result.toObject());
    })
    .catch(err => {
      err = new Error('The username already exists');
      err.status = 400;
      next(err);
    });
});

module.exports = router;