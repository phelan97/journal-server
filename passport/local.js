
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

const localStrategy = new LocalStrategy({usernameField: "email"}, (email, password, done) => {
  let user;
  User.findOne({ email })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'email'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      console.log('local.js USER', user);
      return done(null, user.toObject());
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
    });
});

module.exports = localStrategy;