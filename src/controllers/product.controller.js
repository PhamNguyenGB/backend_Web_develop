const ProductService = require('../services/product.service')
const ImageService = require('../services/image.service')
const productService = new ProductService()
const imageService = new ImageService()
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');

const getAllProducts = async (req, res) => {
    try {
        let data = await productService.getAllProductsService();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server read',
            EC: '-1',
        });
    }
}

const addProduct = async (req, res) => {
    try {
        let data = await productService.addProductService(req.body, req.file);
        await imageService.addImageService(req.file, data.DT._id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.file) {
            await productService.deleteFile(req.body.id)
        }
        let data = await updateProductService(req.body.id, req.body, req.file)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create',
            EC: '-1',
        });
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
}