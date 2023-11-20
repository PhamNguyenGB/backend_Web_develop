const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    productId: {
        type: String,
        require: true,
    },
    orderId: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    totalCost: {
        type: Number,
        require: true,
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);