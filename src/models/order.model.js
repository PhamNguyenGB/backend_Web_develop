const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    staffId: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        require: true,
    },
    deliveryDate: {
        type: Date,
        require: true,
    },
    orderStatus: {
        type: Boolean,
        require: true,
        default: false
    },
});

module.exports = mongoose.model('Order', orderSchema);