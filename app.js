const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes');

const { PORT, MONGO_URL } = process.env;
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
