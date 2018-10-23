
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../index');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Determine if testing is configured', () => {
  before(function() {
    return mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser: true })
      .then(() => Promise.all([
        // TODO: clear old data
      ]));
  });

  beforeEach(function() {
    // TODO: add test data to the database
  });

  afterEach(function() {
    return Promise.all([
      // TODO: clear old data
    ]);
  });

  after(function() {
    mongoose.disconnect();
  });

  it('should pass', () => {
    expect(true).to.be.true;
  });
});