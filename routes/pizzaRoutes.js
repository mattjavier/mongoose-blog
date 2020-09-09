const router = require('express').Router()
const { Pizza, User } = require('../models')

router.get('/pizzas', (req, res) => {
  Pizza.find()
    .populate('user')
    .then(pizzas => res.json(pizzas))
    .catch(err => console.log(err))
})

router.post('/pizzas', (req, res) => {
  Pizza.create(req.body)
    .then(pizza => {
      User.findByIdAndUpdate(pizza.user, { $push: { pizzas: pizza._id } })
        .then(() => res.json(pizza))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/pizzas/:id', (req, res) => {
  Pizza.findByIdAndUpdate(req.params.id, req.body)
    .then(pizza => res.json(pizza))
    .catch(err => console.log(err))
})

router.delete('/pizzas/:id', (req, res) => {
  Pizza.findByIdAndDelete(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router