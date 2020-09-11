const router = require('express').Router()
const { Pizza, User } = require('../models')
const passport = require('passport')

router.get('/pizzas', (req, res) => {
  Pizza.find()
    .populate('user')
    .then(pizzas => res.json(pizzas))
    .catch(err => console.log(err))
})

router.post('/pizzas', passport.authenticate('jwt'), (req, res) => {
  Pizza.create({
    name: req.body.name,
    sauce: req.body.sauce,
    topping_1: req.body.topping_1,
    topping_2: req.body.topping_2,
    extras: req.body.extras,
    comments: req.body.comments,
    user: req.user._id
  })
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