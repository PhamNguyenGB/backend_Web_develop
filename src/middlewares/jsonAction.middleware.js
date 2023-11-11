const jwt = require('jsonwebtoken');
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
};

const veryfyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
};

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = veryfyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EM: 'Bạn chưa đăng nhập!',
                EC: -1,
                DT: '',
            });
        }
    } else {
        return res.status(401).json({
            EM: 'Bạn chưa đăng nhập!',
            EC: -1,
            DT: '',
        });
    }
};



module.exports = {
    createJWT,
    veryfyToken,
    checkUserJWT,
}
