const router = require('express').Router()
const { join } = require('path')

router.get('/register', (req, res) => {
  res.sendFile(join(__dirname, '../public/register.html'))
}) 

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '../public/login.html'))
})

router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router