const express = require('express')
const upload = require("../middlewares/upLoadFIle.middleware")

const productController = require('../controllers/product.controller')
const { veryfyToken } = require('../middlewares/auth.middleware')

const productRouter = express.Router()

productRouter
    .get('/admin/products', productController.getAllProducts)
    .get('/admin/products/:id', productController.findProductById)
    .get('/admin/products/type/:type', productController.findAllProductByType)
    .use(veryfyToken('staff'))
    .post('/admin/products/create', upload.single('image'), productController.addProduct)
    .put('/admin/products/update', upload.single('image'), productController.updateProduct)
    .delete('/admin/products/detele/:id', productController.deleteProduct)


module.exports = productRouter;