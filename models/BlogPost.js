//1 Model = 1 collection = 1 table 
// Schema: khai bao thuoc tinh (fields)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// dinh nghia Model qua Schema Interface
const BlogPostSchema = new Schema({ 
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

// export model
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost