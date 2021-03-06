const {Product} = require('../models')

class productController {
    static async fetchAllProduct (req, res, next) {
        const products = await Product.findAll({attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, order: ['id']})
        res.status(200).json(products)
    }
}

module.exports = productController