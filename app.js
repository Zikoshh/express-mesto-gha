const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6551cda6b3fed233a14d8a7e',
  };

  next();
});
app.use(router);
app.listen(PORT);
