const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { name, email, username, password } = req.body
  User.register(new User({ name, email, username }), password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.authenticate()(username, password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users/pizzas', passport.authenticate('jwt'), (res, req) => {
  res.json(req.user)
})

router.get('/users', (req, res) => {
  User.find()
    .populate('pizzas')
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

// router.post('/users', (req, res) => {
//   User.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => console.log(err))
// })

router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router