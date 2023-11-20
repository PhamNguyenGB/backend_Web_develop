const { log } = require('console');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const { createJWT } = require('../middlewares/jsonAction.middleware');

const salt = bcrypt.genSaltSync(10);

const checkUsername = async (username) => {
    let user = await UserModel.findOne({ username: username });
    if (user) {
        return true;
    }
    return false;
}

const checkPhone = async (phone) => {
    let user = await UserModel.findOne({ phone: phone });
    if (user) {
        return true;
    }
    return false;
}

const checkPassword = async (passwordInput, passwordModel) => {
    if (passwordInput === passwordModel) {
        return true;
    }
    return false;
}

class UserService {
    constructor() {
        this.db = UserModel
    }
    async addNewUser(userData) {
        try {
            console.log(userData);
            let isUsernameExist = await checkUsername(userData.userData.username);
            if (isUsernameExist === true) {
                return {
                    EM: 'Tên tài khoản đã tồn tại',
                    EC: 1,
                    DT: '',
                }
            }

            let isPhoneExits = await checkPhone(userData.userData.phone);
            if (isPhoneExits === true) {
                return {
                    EM: 'Số điện thoại đã được sử dụng',
                    EC: 1,
                    DT: 'isValidPhone'
                }
            }
            const hashedPassword = await bcrypt.hashSync(userData.userData.password, salt);
            console.log(hashedPassword);
            await this.db.create({
                username: userData.userData.username,
                fullname: userData.userData.fullname,
                password: hashedPassword,
                address: userData.userData.address,
                phone: userData.userData.phone,
            })
            return {
                EM: 'Tạo tài khoản thành công',
                EC: 0,
                DT: [],
            };
        } catch (error) {
            console.log(error);
            return {
                EM: 'Tạo tài khoản thất bại',
                EC: -1,
                DT: [],
            };
        }
    }

    async handleLogin(data) {
        try {
            // Check username, email and phone
            let user = await this.db.findOne({ username: data.username });
            if (user) {
                const hashedPassword = await bcrypt.hashSync(data.password, salt);
                let isCorrectPassword = await checkPassword(hashedPassword, user.password);
                if (isCorrectPassword === true) {
                    // let token = 
                    let payload = {
                        id: user.id,
                        username: user.username,
                        address: user.address,
                        phone: user.phone,
                    }
                    let token = createJWT(payload);
                    return {
                        EM: 'Đăng nhập thành công',
                        EC: 0,
                        DT: {
                            access_token: token,
                            id: user.id,
                            username: user.username,
                            address: user.address,
                            phone: user.phone,
                        },
                    }
                }
            }
            return {
                EM: 'Tên tài khoản hoặc mật khẩu chưa chính xác',
                EC: 1,
                DT: '',
            }

        } catch (error) {
            console.log(error);
            return {
                EM: 'Lỗi Đăng nhập',
                EC: -1
            }

        }
    }

    async findByUsername(usernameIn) {
        return await this.db.findOne({ username: usernameIn });
    }

}

module.exports = UserService

