const {Cart, CartProduct, Product} = require('../models')

class cartController {
    static createCart (req, res, next) {
        Cart.create()
            .then((data) => {
                res.status(201).json({message: `Success create Cart with id ${data.id}`})
            })
            .catch((err) => {
                next(err)
            })
    }

    static async fetchCartItems (req, res, next) {
        const items = await CartProduct.findAll({where: {cartId: 1}, attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, include: {
            model: Product,
            key: 'id',
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }, order: ['id']})
        res.status(200).json(items)
    }

    static async addItem (req, res, next) {
        try {
            const {productId} = req.params
            const addedProduct = await Product.findOne({where: {id: productId}})
            if (!addedProduct) throw {name: 'PRODUCT_NOT_FOUND'}
            const productAlreadyExist = await CartProduct.findOne({where: {cartId: 1, productId}})
            if (productAlreadyExist) throw {name: 'PRODUCT_ALREADY_ADDED'}
            if (addedProduct.stock === 0) throw {name: 'NO_STOCK'}
            await CartProduct.create({cartId: 1, productId, count: 1})
            await Product.update({stock: addedProduct.stock-1}, {where: {id: productId}})
            await res.status(201).json({message: `Success add ${addedProduct.name} to cart`})
        } catch (err) {
            next(err)
        }

    }

    static async removeItem (req, res, next) {
        try {
            const {productId} = req.params
            const product = await Product.findOne({where: {id: productId}})
            const itemIsExist = await CartProduct.findOne({where: {cartId: 1, productId}})
            if (!itemIsExist) throw {name: 'ITEM_NOT_IN_CART'}
            await CartProduct.destroy({where: {cartId: 1, productId}})
            await Product.update({stock: product.stock+1}, {where: {id: productId}})
            await res.status(200).json({message: `Success remove ${product.name} from Cart`})
        } catch (err) {
            next(err)
        }
    }

    static async increaseItem (req, res, next) {
        try {
            const {productId} = req.params
            const product = await Product.findOne({where: {id: productId}})
            if (product.stock === 0) throw {name: 'NO_STOCK'}
            const itemInCart = await CartProduct.findOne({where: {productId}})
            if (!itemInCart) throw {name: 'ITEM_NOT_IN_CART'}
            await CartProduct.update({count: itemInCart.count+1}, {where: {cartId: 1, productId}})
            await Product.update({stock: product.stock-1}, {where: {id: productId}})
            res.status(200).json({message: 'Success increase item count'})
        } catch (err) {
           next(err) 
        }
    }

    static async decreaseItem (req, res, next) {
        try {
            const {productId} = req.params
            const product = await Product.findOne({where: {id: productId}})
            const itemInCart = await CartProduct.findOne({where: {productId}})
            if (!itemInCart) throw {name: 'ITEM_NOT_IN_CART'}
            if (itemInCart.count === 1) throw {name: 'ITEM_COUNT_MIN_1'}
            await CartProduct.update({count: itemInCart.count-1}, {where: {cartId: 1, productId}})
            await Product.update({stock: product.stock+1}, {where: {id: productId}})
            res.status(200).json({message: 'Success decrease item count'})
        } catch (err) {
           next(err) 
        }
    }
}

module.exports = cartController