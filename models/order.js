const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order: [
      {
        articleNumber: {
          type: String,
          required: true,
        },
        format: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
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
