const User = require('../models/User.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Tìm kiếm người dùng theo username
        const user = await User.findOne({ username: username });
        
        if (user) {
            // So sánh mật khẩu được nhập với mật khẩu đã được mã hóa trong database
            const same = await bcrypt.compare(password, user.password);
            
            if (same) {
                // Nếu mật khẩu đúng, chuyển hướng đến trang chủ
                // Lưu session người dùng ở đây
                req.session.userId = user._id // Chỉ định user_id (id ng đang dùng) cho mỗi session,  mỗi khi send re thì web gửi cookie cho server kèm authen id check xem đã đăng nhập chưa
                res.redirect('/');
            } else {
                // Nếu mật khẩu không khớp, chuyển hướng lại trang đăng nhập
                res.redirect('/auth/login');
            }
        } else {
            // Nếu không tìm thấy người dùng, chuyển hướng lại trang đăng nhập
            res.redirect('/auth/login');
        }
    } catch (error) {
        // Nếu có lỗi xảy ra, in ra lỗi và có thể xử lý lỗi tại đây
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
};