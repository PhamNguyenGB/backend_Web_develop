const StaffService = require('../services/staff.service');
const staffService = new StaffService();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerStaff = async (req, res) => {
    try {
        // username, password, phone, address
        if (!req.body.staffname || !req.body.position || !req.body.password || !req.body.phone || !req.body.address) {
            return res.status(200).json({
                EM: 'Bạn chưa nhập đầy đủ thông tin!',
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

        let data = await staffService.addNewStaff(req.body);
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
        });
    }
}

const loginStaff = async (req, res) => {
    const error = {}
    const staffInfor = req.body
    if (!staffInfor.staffname) {
        error.staffname = "Missing staffname"
    }
    if (!staffInfor.password) {
        error.password = "Missing password"
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }
    const staff = await staffService.findByStaffname(staffInfor.staffname)
    if (!staff) {
        error.staffname = "Unknown staffname"
    } else {
        const valid = await bcrypt.compare(staffInfor.password, staff.password)
        if (!valid) {
            error.password = "Invalid password"
        }
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }

    const { accessToken } = generateToken({ id: staff._id, staffname: staff.staffname, role: "staff" })
    return res.status(200).json({
        id: staff.id,
        staffname: staff.staffname,
        role: "staff",
        accessToken: accessToken,
    })
};

const logoutStaff = async (req, res) => {
    const staffId = req.id
    return res.sendStatus(200)
};

const generateToken = (staff) => {
    const tokens = {
        accessToken: jwt.sign(staff, process.env.JWT_SECRET, {
            expiresIn: "5h"
        }),
    }
    return tokens
}

module.exports = {
    registerStaff,
    loginStaff,
    logoutStaff,
}
