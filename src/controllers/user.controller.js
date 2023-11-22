const UserService = require('../services/user.service');
const userService = new UserService();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        // username, password, phone, address
        if (req.body.username === '' || req.body.password === '' || req.body.phone === '' || req.body.address === '') {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '1',
                DT: '',
            });
        }

        if (req.body.password && req.body.password.length < 8) {
            return res.status(200).json({
                EM: 'Mật khẩu phải dài hơn 8 ký tự',
                EC: '1',
                DT: 'isValidPassword',
            });
        }

        if (req.body.phone && req.body.phone.length != 10) {
            return res.status(200).json({
                EM: 'Số điện thoại không hợp lệ',
                EC: '1',
                DT: 'isValidPhone',
            });
        }

        let data = await userService.addNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'error from server handleRegister',
            EC: '-1',
            DT: '',
        })
    }
}

const login = async (req, res) => {
    const error = {}
    const userInfor = req.body
    if (!userInfor.username) {
        error.username = "Missing username"
    }
    if (!userInfor.password) {
        error.password = "Missing password"
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }
    const user = await userService.findByUsername(userInfor.username)
    if (!user) {
        error.userInfor = "Unknown username"
    } else {
        const valid = await bcrypt.compare(userInfor.password, user.password)
        if (!valid) {
            error.password = "Invalid password"
        }
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }

    const { accessToken } = generateToken({ id: user._id, username: user.username, role: "user" })
    return res.status(200).json({
        id: user.id,
        username: user.username,
        role: "user",
        accessToken: accessToken,
    })
};

const logout = async (req, res) => {
    return res.sendStatus(200)
};

const generateToken = (user) => {
    const tokens = {
        accessToken: jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "5h"
        }),
    }
    return tokens
}

module.exports = {
    register,
    login,
    logout,
}
