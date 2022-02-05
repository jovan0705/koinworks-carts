const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const cartRouter = require('./cartRouter')

router.use('/carts', cartRouter)
router.use(errorHandler)

module.exports = router