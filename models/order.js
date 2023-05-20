const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order: [
      {
        articleNumber: {
          type: String,
          required: false,
        },
        format: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
        createsAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createsAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('order', orderSchema);
