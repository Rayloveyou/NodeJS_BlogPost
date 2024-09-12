const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    try {
        // Tìm tất cả các bài viết
        const posts = await BlogPost.find({});
        
        // Ghi thông tin session vào termnial
        console.log(req.session)
        
        // Ghi thông tin các bài viết vào terminal
        console.log(posts);
        
        // Render view và truyền posts vào đó
        res.render('index', { 
            blogposts: posts 
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi tìm các bài viết:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy bài viết');
    }
};
