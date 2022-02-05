const router = require('express').Router()
const productController = require('../controller/productController')

router.get('/', productController.fetchAllProduct)

module.exports = router