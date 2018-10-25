

const User = require('../models/user');
const Entry = require('../models/entry');
const {firstPost} = require('../data/initial-post.js');

const express = require('express');
const router = express.Router();

const {requireFields} = require('../utils/server-validation');

router.post('/', requireFields(['email','password', 'firstName', 'lastName']), (req, res, next) => {
  const {email, password, firstName, lastName} = req.body;

  let dbNewUser;

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        email,
        password: digest,
        firstName,
        lastName
      };
      return User.create(newUser);
    })
    .then(dbResult => {
      dbNewUser = dbResult.toObject();

      // construct an automatic entry as an example to the user
      const entryObject = {
        date: Date.now(),
        userId: dbNewUser.id,
        content: firstPost
      };
      return Entry.create(entryObject);
    })
    .then(() => {
      return res.status(201).location(`/api/users/${dbNewUser.id}`).json(dbNewUser);
    })
    .catch(err => {
      err = new Error('The username already exists');
      err.status = 400;
      next(err);
    });
});

module.exports = router;