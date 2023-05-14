const router = require('express').Router()
const { celebrate, Joi } = require('celebrate');

const {createUser, login} = require('../controllers/user')

// router.post('/signup', createUser)
router.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        patronymic: Joi.string().required(),
        gender: Joi.string().required(),
        type: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
}), createUser)
router.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login)

module.exports = router