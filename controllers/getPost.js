const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    try {
        // Tìm bài viết theo ID
        const detailPost = await BlogPost.findById(req.params.id);
      
        // Ghi thông tin bài viết vào terminal
        console.log(detailPost);
        
        // Render view và truyền bài viết vào đó
        res.render('post', { detailPost });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi tìm bài viết:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy bài viết');
    }
}