require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bookmarksRouter = require('./bookmarks/bookmarks-router')
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';


app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/bookmarks', bookmarksRouter)



app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.essage, error };
  }
  res.status(500).json(response);
});

module.exports = app;
