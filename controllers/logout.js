module.exports = (req, res) => {
    // xóa tất cả dữ liệu liên quan sesson, kể cả session user
    // id, sau khi xóa xong thì redirect về trang chủ.
    req.session.destroy(() => { // logout tài khoản = hàm destroy()  
        res.redirect('/') // logout tài khoản xong rồi sẽ chuyền về trang chủ
    })
}