const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    address: {
        type: [String],
    },
    phone: {
        type: String,
        require: true,
    },
    refreshToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('User', userSchema)