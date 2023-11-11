const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
    staffname: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        default: null
    }
})

module.exports = new mongoose.model("staff", staffSchema)