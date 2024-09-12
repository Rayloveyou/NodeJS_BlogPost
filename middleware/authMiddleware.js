// middleware giúp chỉ cho người đã đăng nhập mới có thê truy cập 1 vài trang cụ thể
const User = require('../models/User')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId); // Tìm user theo userId từ session
    
        if(!user) {
            return res.redirect('/') // nếu k có user thì back về trang chủ
        }
        next();
        
    } catch (error) {
        console.error(error); // Xử lý lỗi, nếu có
        return res.redirect('/') // Nếu xảy ra lỗi, chuyển hướng về trang chủ
    }
};
