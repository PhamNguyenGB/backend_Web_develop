const express = require('express')

const userController = require('../controllers/user.controller')
const { veryfyToken } = require("../middlewares/auth.middleware")

const userAuthRouter = express.Router()

userAuthRouter
    .post('/login', userController.login)
    .post('/register', userController.register)
    // .post('/refresh', userController.refreshToken)
    .post('/logout', veryfyToken('user'), userController.logout)

module.exports = userAuthRouter