const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
mongoose.connect(MONGO_URL);
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6551cda6b3fed233a14d8a7e',
  };

  next();
});
app.use(router);
app.listen(PORT);
