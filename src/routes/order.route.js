const express = require("express")

const orderController = require("../controllers/order.controller")
const { veryfyToken } = require("../middlewares/auth.middleware.js")

const orderRouter = express.Router()

orderRouter
    .post("/order", veryfyToken('user'), orderController.addOrder)
    .get("/order/all", orderController.getAllOrders)
    .get("/order", veryfyToken('user'), orderController.getOrder)
    .get("/order/:orderId", veryfyToken('user'), orderController.getOrderDetail)
    .get("/admin/order/:orderId", veryfyToken('staff'), orderController.getOrderDetail)
    .put("/order/updateStatus", veryfyToken('staff'), orderController.updateOrderStatus)

module.exports = orderRouter