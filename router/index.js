const router = require('express').Router()
const cartRouter = require('./cartRouter')

router.use('/carts', cartRouter)

module.exports = router