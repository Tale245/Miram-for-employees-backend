const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { STATUS__OK } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../Error/UnauthorizedError');
const BadRequestError = require('../Error/BadRequestError');
const SignupError = require('../Error/SignupError');

// Получаем информацию о пользователях
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.status(STATUS__OK).send(data))
    .catch((err) => {
      next(err);
    });
};
// Получаем информацию о текущем пользователе
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Передан невалидный id пользователя');
    })
    .then((data) => res.status(STATUS__OK).send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, lastName, patronymic, gender, type, email, password } =
    req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        lastName,
        patronymic,
        gender,
        type,
        email,
        password: hash,
      })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else if (e.code === 11000) {
            next(
              new SignupError(
                'Email адрес занят, используйте другой, либо войдите в аккаунт'
              )
            );
          } else {
            next(e);
          }
        });
    })
    .catch((e) => {
      next(e);
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'secret-key');

      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Ошибка авторизации'));
    });
};
