const Order = require('../models/order');

const { NOT__FOUND_ERROR, STATUS__OK } = require('../constants/constants');

const NotFoundError = require('../Error/NotFoundError');
const BadRequestError = require('../Error/BadRequestError');

// Здесь хранится айди созданного заказа
let id;

module.exports.getOrders = (req, res, next) => {
  Order.find({})
    .then((data) => res.status(STATUS__OK).send(data))
    .catch((e) => next(e));
};

// Создаем заказ
module.exports.createOrder = (req, res, next) => {
  Order.create(req.body)
    .then((data) => {
      res.status(STATUS__OK).send(data);
      // Берем айди созданного заказа и записываем его в переменную
      id = data._id.toHexString();
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданые некорректные данные'));
      } else {
        next(e);
      }
    });
};

// Добавляем позиции в новый заказ
module.exports.addItemsInNewOrder = (req, res, next) => {
  // Берем айди заказа из переменной, чтобы найти его и добавить туда позиции
  Order.findById(id)
    .then((data) => {
      data.order.push(req.body);
      data.save();
      res.status(200).send(data);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (e.statusCode === NOT__FOUND_ERROR) {
        next(new NotFoundError('Запрашиваемый заказ не найден'));
      } else {
        next(e);
      }
    });
};

// Добавляем позиции в старый заказ
module.exports.addItemsInOldOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .then((data) => {
      data.order.push(req.body);
      data.save();
      res.status(200).send(data);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (e.statusCode === NOT__FOUND_ERROR) {
        next(new NotFoundError('Запрашиваемый заказ не найден'));
      } else {
        next(e);
      }
    });
};
