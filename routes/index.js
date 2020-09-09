const router = require('express').Router()

router.use('/api', require('./pizzaRoutes.js'))
router.use('/api', require('./userRoutes.js'))

module.exports = router