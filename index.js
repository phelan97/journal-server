
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const entryRouter = require('./routes/entries');
const {PORT, CLIENT_ORIGIN} = require('./config');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use(cors({
  origin: CLIENT_ORIGIN
}));

// TODO: auth

// TODO: routes here
app.use('/api/entries', entryRouter);

// TODO: 404 and error handling

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // FIXME: dbConnect();
  runServer();
}