const mongoose = require("mongoose")

const productImageSchema = mongoose.Schema({
    productId: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model("Image", productImageSchema)