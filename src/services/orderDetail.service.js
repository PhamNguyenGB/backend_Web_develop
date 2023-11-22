const OrderDetailModel = require("../models/orderDetail.model");
const ObjectId = require("mongoose").Types.ObjectId;

class OrderDetailService {
    constructor() {
        this.db = OrderDetailModel
    }

    async addManyOrderDetail(manyOrderDetail) {
        return await this.db.insertMany(manyOrderDetail)
    }

    async getManyOrderDetail(orderId) {
        return await this.db.find({ orderId: orderId })
    }
}

module.exports = OrderDetailService;