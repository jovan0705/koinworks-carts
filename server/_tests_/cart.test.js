const request = require("supertest");
const app = require("../app");
const { Cart, CartProduct, Product } = require('../models');

beforeAll(async () => {
    await Cart.create();

    await Product.create(
        {
            name: 'Tamiya',
            price: 100000,
            stock: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    );

    await Product.create(
        {
            name: 'Jeans Polo',
            price: 250000,
            stock: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    );

    await Product.create(
        {
            name: 'LV Wallet',
            price: 500000,
            stock: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    );
});

afterAll((done) => {
    Cart.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
    .then(() => {
        Product.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
        });
    })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
});

describe('Add items to Cart', () => {
    test('[Success-201] Add items to cart', (done) => {
        request(app)
        .post('/carts/product/1')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(201);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Success add Tamiya to cart')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Product not Found', (done) => {
        request(app)
        .post('/carts/product/4')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Product not Found')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Product already in Cart', (done) => {
        request(app)
        .post('/carts/product/1')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Product already added')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Product Stock is depleted', (done) => {
        request(app)
        .post('/carts/product/2')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('This item is currently not available')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
   
})

describe('Increase Item Count in Cart', () => {
    test('[Success-200] Success Increase item Count', (done) => {
        request(app)
        .patch('/carts/product/1/increase')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(200);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Success increase item count')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Item is not in Cart', (done) => {
        request(app)
        .patch('/carts/product/3/increase')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Item not found in Cart')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Product Stock is depleted', (done) => {
        request(app)
        .patch('/carts/product/1/increase')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('This item is currently not available')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
})

describe('Decrease Item Count in Cart', () => {
    test('[Success-200] Success Decrease item Count', (done) => {
        request(app)
        .patch('/carts/product/1/decrease')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(200);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Success decrease item count')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Item is not in Cart', (done) => {
        request(app)
        .patch('/carts/product/3/decrease')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Item not found in Cart')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Minimum item count 1', (done) => {
        request(app)
        .patch('/carts/product/1/decrease')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Minimum count 1 item')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
})

describe('Remove items from Cart', () => {
    test('[Success-200] Remove items from cart', (done) => {
        request(app)
        .delete('/carts/product/1')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(200);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Success remove Tamiya from Cart')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })

    test('[Error - 400] Item is not in Cart', (done) => {
        request(app)
        .delete('/carts/product/1')
        .then((response) => {
            const result = response.body;
            expect(response.status).toBe(400);
            expect(result).toEqual(expect.any(Object));
            expect(result.message).toBe('Item not found in Cart')
            done()
        })
        .catch((err) => {
            done(err)
        })
    })
})

