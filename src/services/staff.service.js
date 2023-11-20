const StaffModel = require('../models/staff.model');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const { creeateJWT, createJWT } = require('../middlewares/jsonAction.middleware');
const { create } = require('../models/user.model');

const salt = bcrypt.genSaltSync(10);

const checkStaffName = async (staffName) => {
    let staff = await StaffModel.findOne({ staffname: staffName });
    if (staff) {
        return true;
    }
    return false;
}

const checkPhoneStaff = async (phoneStaff) => {
    let checkPhone = await StaffModel.findOne({ phone: phoneStaff });
    if (checkPhone) {
        return true;
    }
    return false;
}

const checkPassword = async (passwordInput, passwordModel) => {
    const hashedPassword = await bcrypt.hashSync(passwordInput, salt);
    if (hashedPassword === passwordModel) {
        return true;
    }
    return false;
}

class StaffService {
    constructor() {
        this.db = StaffModel;
    }

    async addNewStaff(staffData) {
        try {
            let isStaffName = await checkStaffName(staffData.staffname);
            if (isStaffName === true) {
                return {
                    EM: 'Tên tài khoản đã tồn tại',
                    EC: 1,
                    DT: '',
                };
            }
            let isPhoneExits = await checkPhoneStaff(staffData.phone);
            if (isPhoneExits === true) {
                return {
                    EM: 'Số điện thoại đã tồn tại',
                    EC: 1,
                    DT: '',
                };
            }
            const hashedPassword = await bcrypt.hashSync(staffData.password, salt);
            await this.db.create({
                staffname: staffData.staffname,
                fullname: staffData.fullname,
                password: hashedPassword,
                position: staffData.position,
                address: staffData.address,
                phone: staffData.phone,
            })
            return {
                EM: 'Tạo tài khoản nhân viên thành công',
                EC: 0,
                DT: '',
            }
        } catch (error) {
            console.log(error);
            return {
                EM: 'Tạo tài khoản nhân viên thất bại',
                EC: -1,
                DT: '',
            }
        }
    }

    async loginStaff(data) {
        try {
            let staff = await this.db.findOne({ staffname: data.staffname });
            if (staff) {
                let isCorrectPassword = await checkPassword(data.password, staff.password);
                if (isCorrectPassword === true) {
                    //let token
                    let payload = {
                        id: staff.id,
                        staffname: staff.staffname,
                        address: staff.address,
                        phone: staff.phone,
                    }
                    let token = createJWT(payload);
                    return {
                        EM: 'Đăng nhập thành công',
                        EC: 0,
                        DT: {
                            access_token: token,
                            id: staff.id,
                            staffname: staff.staffname,
                            address: staff.address,
                            phone: staff.phone,
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
    async findByStaffname(staffnameIn) {
        return await this.db.findOne({ staffname: staffnameIn })
    }
}

module.exports = StaffService;