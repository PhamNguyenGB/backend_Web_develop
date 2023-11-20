const express = require('express');

const staffController = require('../controllers/staff.controller');
// const { veryfyToken } = require('../middlewares/jsonAction.middleware');
const { veryfyToken } = require("../middlewares/auth.middleware")

const staffAuthRoute = express.Router();

staffAuthRoute
    .post('/admin/login', staffController.loginStaff)
    .post('/admin/register', staffController.registerStaff)
    .post('/admin/logout', veryfyToken('staff'), staffController.logoutStaff)


module.exports = staffAuthRoute;