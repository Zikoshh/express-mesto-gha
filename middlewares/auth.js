const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  let payload;
  try {
    if (!req.cookies.jwt || req.cookies.jwt.startsWith('Bearer ')) {
      return next(new UnAuthorizedError('Необходима авторизация'));
    }
    const token = req.cookies.jwt.replace('Bearer ', '');

    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new UnAuthorizedError('С токеном что-то не так'));
    }

    return next(err);
  }
  req.user = payload;
  next();
};
