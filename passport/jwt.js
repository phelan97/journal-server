const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('../config');

const User = require('../models/user');

const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    // FIXME:
  // User.findById(payload.user._id)
  //   .then((user) => done(null, user));
  done(null, payload.user);
});

module.exports = jwtStrategy;