const ProdcutModel = require('../models/product.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs")

class ProductService {
    constructor() {
        this.db = ProdcutModel
    }

    async getAllProductsService() {
        let data = await this.db.find({});
        if (data) {
            return {
                EM: "Get all products successfully",
                EC: 0,
                DT: data,
            }
        } else {
            return {
                EM: "Get all products failed",
                EC: 1,
                DT: [],
            }
        }
    }

    async addProductService(data, file) {
        try {
            let Product = await this.db.create({
                name: data.name,
                price: data.price,
                type: data.type,
                description: data.description,
                image_url: `http://localhost:8888/public/images/${file.filename}`,
            })
            return {
                EM: "Add Product successfully",
                EC: 0,
                DT: Product,
            }
        } catch (error) {
            console.log(error)
            return {
                EM: 'error getting create product',
                EC: 1,
                DT: '',
            }
        }
    }

    async deleteFile(idProduct) {
        try {
            let product = await this.db.findOne({
                id: idProduct
            });
            if (product) {
                const pathName = path.join(__dirname, '../../../public/images/');
                const fileName = product.dataValues.img.split('/')[5];
                await fs.unlink(pathName + fileName, (err) => console.log(err));
                return {
                    EM: 'Delete file successfully',
                    EC: 0,
                    DT: [],
                };
            } else {
                return {
                    EM: 'product not found',
                    EC: 2,
                    DT: '',
                };
            }
        } catch (error) {
            console.log(error);
            return {
                EM: 'error delete file',
                EC: 1,
                DT: '',
            };
        }
    };

    async updateProductService(idProduct, data, file) {
        let product = await this.db.findOne({ _id: idProduct })
        if (product) {
            if (file) {
                await this.db.update({
                    name: data.name,
                    price: data.price,
                    type: data.type,
                    description: data.description,
                    image_url: `http://localhost:8888/public/images/${file.filename}`,
                })
            } else {
                await this.db.update({
                    name: data.name,
                    price: data.price,
                    type: data.type,
                    description: data.description,
                })
            }
        }
    }

    async deleteImage(idProduct) {
        try {
            await this.db.delete({ idProduct: idProduct });
            return {
                EM: "Product deleted",
                EC: 0,
                DT: [],
            }
        } catch (error) {
            return {
                EM: "error delete product",
                EC: 1,
                DT: [],
            }
        }
    }

}

module.exports = ProductService;