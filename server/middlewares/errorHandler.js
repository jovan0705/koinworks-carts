const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "PRODUCT_NOT_FOUND":
            res.status(400).json({message: 'Product not Found'})
            break;
        
        case "NO_STOCK": 
            res.status(400).json({message: 'This item is currently not available'})
            break;

        case "ITEM_COUNT_MIN_1":
            res.status(400).json({message: 'Minimum count 1 item'})
            break;
            
        case "PRODUCT_ALREADY_ADDED":
            res.status(400).json({message: 'Product already added'})
            break;

        case "ITEM_NOT_IN_CART": 
            res.status(400).json({message: 'Item not found in Cart'})
            break;
        default:
            res.status(500).json(err)
            break;
    }
}

module.exports = errorHandler