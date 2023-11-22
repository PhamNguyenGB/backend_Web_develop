const OrderService = require("../services/order.service")
const orderService = new OrderService()

const OrderDetailService = require("../services/orderDetail.service")
const orderDetailService = new OrderDetailService()

async function addOrder(req, res) {
    const error = {}
    const userId = req.id
    const orderDetail = req.body.orderDetail

    if (!orderDetail) {
        error.orderDetail = "No detail"
    } else if (orderDetail.length < 1) {
        error.orderDetail = "No detail"
    }

    if (Object.keys(error).length > 0) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
    const order = {
        userId: userId,
        orderDate: Date.now(),
    }

    console.log("check orrder", orderDetail);
    try {
        const orderResult = await orderService.addOrder(order)
        const orderId = orderResult._id
        const detail = orderDetail.map((item) => ({
            orderId: orderId,
            productId: item._id,
            quantity: item.quantity,
        }))
        const detailResult = await orderDetailService.addManyOrderDetail(detail)
        return res.status(201).json(orderResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function getOrder(req, res) {
    const userId = req.id
    try {
        const orderResult = await orderService.getOrder(userId)
        res.status(200).json(orderResult);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

async function getOrderDetail(req, res) {
    const orderId = req.params.orderId
    try {
        const orderDetailResult = await orderDetailService.getManyOrderDetail(orderId)
        res.status(200).json(orderDetailResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function getAllOrders(req, res) {
    try {
        const allOrderResult = await orderService.getAllOrder()
        res.status(200).json(allOrderResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function updateOrderStatus(req, res) {
    const orderId = req.body.orderId
    try {
        const result = await orderService.updateOrderStatus(orderId)
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOrderDetail,
    getAllOrders,
    updateOrderStatus,
}