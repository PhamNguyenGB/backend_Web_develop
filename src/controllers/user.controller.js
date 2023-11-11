const UserService = require('../services/user.service')
const userService = new UserService()
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        // username, password, phone, address
        if (!req.body.username || !req.body.password || !req.body.phone || !req.body.address) {
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
    try {
        console.log(req.body)
        let data = await userService.handleLogin(req.body);
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server handleLogin',
            EC: '-1',
            DT: '',
        });
    }
};

module.exports = {
    register,
    login,
}
