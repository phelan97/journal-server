
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new mongoose.Schema({
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

entrySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Entry', entrySchema);