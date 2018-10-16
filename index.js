
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const entryRouter = require('./routes/entries');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');


const {dbConnect} = require('./db-mongoose');
const {PORT, CLIENT_ORIGIN} = require('./config');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use(cors({
  origin: CLIENT_ORIGIN
}));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/register', userRouter);
app.use('/api/login', authRouter);

// TODO: routes here
app.use('/api/entries', entryRouter);


// ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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
  dbConnect();
  runServer();
}