const routes = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/validation');

routes.post('/signin', loginValidation, login);
routes.post('/signup', createUserValidation, createUser);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);
routes.use('/*', (req, res) => {
  res.status(404).send({ message: 'Мы не обрабатываем данный роут' });
});

module.exports = routes;
