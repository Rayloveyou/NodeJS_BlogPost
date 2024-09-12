const User = require('../models/User.js');

// Tạo bài user mới với dữ liệu từ req.body 
module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);  // Chờ Promise hoàn thành
        res.redirect('/');  // Nếu thành công, chuyển hướng đến trang chủ
    } catch (error) {
        console.error(error);  // Xử lý lỗi nếu có
        res.redirect('/auth/register') // nếu failed thì refresh lại trang
    }
};
