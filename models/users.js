const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: {
      value: true,
      message: 'Поле about является обязательным',
    },
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: {
      value: true,
      message: 'Поле avatar является обязательным',
    },
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);