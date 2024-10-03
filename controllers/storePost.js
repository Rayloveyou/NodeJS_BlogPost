const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = async (req, res) => {
    try {
        // Kiểm tra nếu có tệp tải lên
        if (!req.files || !req.files.image) {
            return res.status(400).json({ success: false, message: 'Không có ảnh tải lên.' });
        }

        let image = req.files.image;
        // Đường dẫn nơi lưu trữ ảnh
        const imagePath = path.resolve(__dirname, '../public/upload', image.name);

        // Di chuyển ảnh đến thư mục public/upload
        await new Promise((resolve, reject) => {
            image.mv(imagePath, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Tạo bài viết mới với dữ liệu từ req.body và đường dẫn ảnh
        const blogpost = await BlogPost.create({
            ...req.body,
            image: `/upload/${image.name}`
        });

        // Trả về phản hồi JSON thành công cho client
        res.status(200).json({ success: true, message: 'Post saved successfully' });
        console.log('Post saved: ', blogpost);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi tạo bài viết:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lưu bài viết' });
    }
};
