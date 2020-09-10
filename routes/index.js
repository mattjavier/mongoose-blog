const router = require('express').Router()

router.use('/api', require('./pizzaRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router