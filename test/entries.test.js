
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../index');
const User = require('../models/user');
const Entry = require('../models/entry');
const {users, entries} = require('../data/seed-data.js');
const {TEST_DATABASE_URL, JWT_SECRET} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Test entries endpoint', () => {
  before(function() {
    return mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser: true })
      .then(() => Promise.all([
        User.deleteMany(),
        Entry.deleteMany()
      ]));
  });

  let user;
  let token;

  beforeEach(function () {
    return Promise.all([
      User.insertMany(users),
      Entry.insertMany(entries)
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({user}, JWT_SECRET, {subject: user.email});
      });
  });


  afterEach(function() {
    return Promise.all([
      User.deleteMany(),
      Entry.deleteMany()
    ]);
  });

  after(function() {
    mongoose.disconnect();
  });

  describe('GET /api/entries', function() {
    it('should list all entries', function() {
      return Promise.all([
        Entry.find({userId: user.id}),
        chai.request(app).get('/api/entries')
          .set('Authorization', `Bearer ${token}`)
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(data.length);
        });
    });

    it('should filter by entry id', function() {
      let data;
      return Entry.findOne({userId: user.id})
        .then(_data => {
          data = _data;
          return chai.request(app).get(`/api/entries/${data.id}`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then((res) => {
          const body = res.body;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(body).to.include.all.keys('id', 'userId', 'content', 'date');
          expect(body.userId).to.equal(data.userId.toString());
          expect(body.id).to.equal(data.id.toString());
          expect(body.content).to.equal(data.content);
          expect(body.date).to.equal(new Date(data.date).toISOString());
        });
    });

    it('should fail if the id is invalid', function() {

    });
  });

  describe('PUT /api/entries/:id', function() {
    it('should modify an entry by id', function() {

    });

    it('should fail if the id is invalid', function() {

    });
  });

  describe('POST /api/entries', function() {
    it('should create a new entry if the required fields are present', function() {

    });
  });

  describe('DELETE /api/entries', function() {
    it('should delete an entry by id', function() {

    });

    it('should fail if the id is invalid', function() {

    });
  });
});