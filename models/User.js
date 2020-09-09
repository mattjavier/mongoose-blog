const { model, Schema } = require('mongoose')

const User = new Schema({
  name: { 
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  pizzas: [{
    type: Schema.Types.ObjectId,
    ref: 'Pizza'
  }]
}, { timestamps: true })

module.exports = model('User', User)