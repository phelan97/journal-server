
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// TODO: track name, other info
const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.virtual('id').get(function() {
  return this._id;
});

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
    // FIXME: double check: does this ever get logged?
    console.log('TRANSFORM RESULT ', result);
    return result;
  }
});

module.exports = mongoose.model('User', userSchema);