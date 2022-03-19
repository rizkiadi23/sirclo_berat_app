const mongoose = require('mongoose');

const WeightSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Please add the record date'],
    },
    minimum: {
      type: Number,
      required: [true, 'Please add a minimum value'],
    },
    maximum: {
      type: Number,
      required: [true, 'Please add a maximum value'],
    },
    differences: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Weight', WeightSchema);
