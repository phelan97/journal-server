
const {dbConnect, dbDisconnect, dbGet} = require('../db-mongoose');
const {users, entries} = require('../data/seed-data');
const User = require('../models/user');
const Entry = require('../models/entry');

dbConnect()
  // TODO: add safety check before dropping db
  .then(() => dbGet().connection.db.dropDatabase())
  .then(() => {
    console.log('Inserting data:');
    return Promise.all([
      User.insertMany(users),
      Entry.insertMany(entries)
    ]);
  })
  .then(info => {
    console.log('User count: ', info[0].length);
    console.log('Entry count: ', info[1].length);
    return dbDisconnect();
  })
  .then(() => console.log('Disconnected from the database'))
  .catch(err => {
    console.log('Error trying to seed data');
    console.log(err);
  })