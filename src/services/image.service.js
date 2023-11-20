const ImageModel = require('../models/image.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs")

class ImageService {
    constructor() {
        this.db = ImageModel
    }

    async addImageService(file, productId) {
        try {
            await this.db.create({
                productId: productId,
                path: file.path,
                url: `http://localhost:8888/public/images/${file.filename}`,
            })
            return {
                EM: "Add Image successfully",
                EC: 0,
                DT: [],
            }
        } catch (error) {
            console.log(error)
            return {
                EM: "error add Image",
                EC: 1,
                DT: [],
            }
        }
    }

    async updateImage(file, productId) {
        try {
            await this.db.findOneAndUpdate({ productId: productId },
                {
                    productId: productId,
                    path: file.path,
                    url: `http://localhost:8888/public/images/${file.filename}`,
                });
            return {
                EM: "Image successfully updated",
                EC: 0,
                DT: [],
            }
        } catch (error) {
            console.log(error)
            return {
                EM: "error add Image",
                EC: 1,
                DT: [],
            }
        }
    }

    async deleteImage(idProduct) {
        try {
            console.log(idProduct);
            await this.db.deleteOne({ productId: idProduct });
            return {
                EM: "Image deleted",
                EC: 0,
                DT: [],
            }
        } catch (error) {
            console.log(error)
            return {
                EM: "error delete Image",
                EC: 1,
                DT: [],
            }
        }
    }

}

module.exports = ImageService 