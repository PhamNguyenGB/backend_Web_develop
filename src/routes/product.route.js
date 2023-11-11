const express = require('express')
const upload = require("../middlewares/upLoadFIle.middleware")

const productController = require('../controllers/product.controller')
const { veryfyToken } = require('../middlewares/jsonAction.middleware')

const productRouter = express.Router()

productRouter
    .get('/admin/products', productController.getAllProducts)
    .post('/admin/products/create', upload.single('image'), productController.addProduct)

module.exports = productRouter;