const router = require('express').Router()
const cartController = require('../controller/cartController')

router.get('/items', cartController.fetchCartItems)
router.post('/create', cartController.createCart)
router.post('/product/:productId', cartController.addItem)
router.delete('/product/:productId', cartController.removeItem)
router.patch('/product/:productId/increase', cartController.increaseItem)
router.patch('/product/:productId/decrease', cartController.decreaseItem)

module.exports = router