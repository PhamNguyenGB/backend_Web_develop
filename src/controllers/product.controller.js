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
            DT: '',
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.file) {
            await imageService.updateImage(req.file, req.body._id)
            await productService.deleteFile(req.body._id)
        }
        let data = await productService.updateProductService(req.body._id, req.body, req.file);
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

const deleteProduct = async (req, res) => {
    try {
        await imageService.deleteImage(req.params.id);
        await productService.deleteFile(req.params.id);
        let data = await productService.deleteProductService(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server delete',
            EC: '-1',
        });
    }
}

const findProductById = async (req, res) => {
    try {
        let data = await productService.findProductByIdService(req.params.id);
        console.log(data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server find product',
            EC: '-1',
        });
    }
}

const findAllProductByType = async (req, res) => {
    try {
        console.log("check params", req.params);
        let data = await productService.findAllProductByTypeService(req.params.type);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server find all type product',
            EC: '-1',
        });
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    findAllProductByType,
}