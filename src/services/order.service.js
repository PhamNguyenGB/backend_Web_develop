const OrderModel = require('../models/order.model');
const ObjectId = require("mongoose").Types.ObjectId;

class OrderService {
    constructor() {
        this.db = OrderModel;
    }

    async addOrder(orderData) {
        return await this.db.create(orderData);
    }

    async getOrder(userId) {
        return await this.db.find({ userId: userId });
    }

    async getAllOrder() {
        return await this.db.find({})
    }

    async updateOrderStatus(orderId) {
        return await this.db.findOneAndUpdate({
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : ""
        }, {
            orderStatus: true,
        })
    }
}

module.exports = OrderService;