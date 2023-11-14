const User = require('../models/users');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Извините, что-то пошло не так' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw new Error('NotFound');
    }
    return res.send(user);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Пользователь с указанным id не найден' });
    }

    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Передан невалидный id' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);

    return res.status(201).send(await newUser.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: `${err.message}` });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateInfo = async (req, res) => {
  try {
    const newUserData = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!newUserData) {
      throw new Error('NotFound');
    }

    return res.status(200).send(newUserData);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Пользователь с указанным id не найден' });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: `${err.message}` });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const newUserData = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!newUserData) {
      throw new Error('NotFound');
    }

    return res.status(200).send(newUserData);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Пользователь с указанным id не найден' });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: `${err.message}` });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateInfo,
  updateAvatar,
};
