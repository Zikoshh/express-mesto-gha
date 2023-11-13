const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле name является обязательным',
      },
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: {
        value: true,
        message: 'Поле about является обязательным',
      },
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: {
        value: true,
        message: 'Поле avatar является обязательным',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
