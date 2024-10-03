const Contact = require('../models/Contact');

module.exports = async (req, res) => {
    try {
        const { name, email, phonenumber, message } = req.body;

        // Tạo một instance mới từ model Contact
        const newContact = await Contact.create({
            name,
            email,
            phonenumber,
            message
        });

        // Trả về phản hồi JSON thành công cho client
        res.status(200).json({ success: true, message: 'Contact saved successfully' });
        console.log('Contact saved: ', newContact);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi lưu contact:', error);
        res.status(500).json({ success: false, message: 'Failed to save contact', error });
    }
};
