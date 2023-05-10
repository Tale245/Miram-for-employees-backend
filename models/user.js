const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['мужской', 'женский']
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'worker']
  }

});
