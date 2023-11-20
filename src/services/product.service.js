const ProdcutModel = require('../models/product.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs")
const path = require("path");

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
                _id: idProduct
            });
            if (product) {
                const pathName = path.join(__dirname, '../../public/images/');
                const fileName = product.image_url.split('/')[5];
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
        try {
            if (file) {
                await this.db.findOneAndUpdate({ _id: idProduct },
                    {
                        name: data.name,
                        price: data.price,
                        type: data.type,
                        description: data.description,
                        image_url: `http://localhost:8888/public/images/${file.filename}`,
                    })
                return {
                    EM: "update Product successfully",
                    EC: 0,
                    DT: [],
                }
            } else {
                await this.db.findOneAndUpdate({ _id: idProduct },
                    {
                        name: data.name,
                        price: data.price,
                        type: data.type,
                        description: data.description,
                    })
                return {
                    EM: "update Product successfully",
                    EC: 0,
                    DT: [],
                }
            }
        } catch (error) {
            console.log(error);
            return {
                EM: 'error update product',
                EC: 1,
                DT: '',
            };
        }
    }

    // async deleteImage(idProduct) {
    //     try {
    //         await this.db.deleteOne({ productId: idProduct });
    //         return {
    //             EM: "Image deleted",
    //             EC: 0,
    //             DT: [],
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return {
    //             EM: "error delete image",
    //             EC: 1,
    //             DT: [],
    //         }
    //     }
    // }

    async deleteProductService(idProduct) {
        try {
            await this.db.deleteOne({ _id: idProduct });
            return {
                EM: "Product deleted",
                EC: 0,
                DT: [],
            }
        } catch (error) {
            console.log(error)
            return {
                EM: "error delete product",
                EC: 1,
                DT: [],
            }
        }
    }

    async findProductByIdService(idProduct) {
        try {
            let product = await this.db.findOne({ _id: new ObjectId(idProduct) });
            return {
                EM: "Find Product successfully",
                EC: 0,
                DT: product,
            }
        } catch (error) {
            console.log(error);
            return {
                EM: "error find product",
                EC: 1,
                DT: [],
            }
        }
    }

    async findAllProductByTypeService(type) {
        try {
            let product = await this.db.find({ type: type });
            return {
                EM: "Find type all Product successfully",
                EC: 0,
                DT: product,
            }
        } catch (error) {
            console.log(error);
            return {
                EM: "error find type product",
                EC: 1,
                DT: [],
            }
        }
    }

}

module.exports = ProductService;