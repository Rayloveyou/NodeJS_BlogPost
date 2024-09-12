// middleware xử lý nếu user đã login 

module.exports = async (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/'); // Nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
    }
    next(); // Nếu chưa đăng nhập, tiếp tục đến middleware tiếp theo
};
