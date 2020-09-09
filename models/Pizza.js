const { model, Schema } = require('mongoose')

const Pizza = new Schema({ 
  name: {
    type: String,
    required: true
  },
  sauce: {
    type: String,
    required: true
  },
  topping_1: {
    type: String
  },
  topping_2: {
    type: String
  },
  extras: {
    type: String
  }, 
  comments: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = model('Pizza', Pizza)