const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const cartRouter = require('./cartRouter')
const productRouter = require('./productRouter')

router.use('/carts', cartRouter)
router.use('/products', productRouter)
router.use(errorHandler)

module.exports = router