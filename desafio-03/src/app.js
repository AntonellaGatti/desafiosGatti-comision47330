const express = require('express')
const ProductManager = require('./productManager')

const app = express()
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('../products.json');

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Challenge 3 - Servers with Express</h1>')
})

/// QUERY
app.get('/products', async (req, res) => {
    try {
        let limit = undefined
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        const product = await productManager.getProducts(limit)

        if (!limit) {
            res.send(product)
        } else {
            res.send(product.slice(0, limit))
        }
    }
    catch (error) {
        throw new Error(error);
    }
})
// Testing Query
// http://localhost:8080/products
// http://localhost:8080/products?limit=5



/// PARAMS
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.getProductsById(productId)

        if (!product) {
            res.send('<h1>Sorry! We did not found that Id</h1>')
        } else {
            res.send(product)
        }
    } catch (error) {
        throw new Error(error);
    }

})

// Testing Params
// http://localhost:8080/products/2
// http://localhost:8080/products/180


app.listen(8080, () => {
    console.log('Servidos escuchando en el puerto 8080')
})