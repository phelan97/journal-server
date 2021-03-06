
const express = require('express');
const router = express.Router();

const passport = require('passport');
const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');
const {requireFields} = require('../utils/server-validation');

function createAuthToken (user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.email,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', requireFields(['email', 'password']), localAuth, function(req, res) {
  const authToken = createAuthToken(req.user);
  return res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;