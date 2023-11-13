const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { hardCodingAId } = require('./middlewares/hardCodingAId');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(hardCodingAId);
app.use(router);
app.listen(PORT);
