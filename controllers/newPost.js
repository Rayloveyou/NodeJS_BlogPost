module.exports = (req, res) => {
    // kiểm tra xem nếu session có chứa user id (chứng tỏ đã đăng nhập) hay không thì cho phép tạo bài post
    if(req.session.userId){
        return res.render('create'); 
    }
    // nếu chưa đăng nhập thì chuyển về trang đăng nhập
    res.redirect('/auth/login')
}
   
