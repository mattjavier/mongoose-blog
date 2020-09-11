const router = require('express').Router()
const { join } = require('path')

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '../public/auth.html'))
})

router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router