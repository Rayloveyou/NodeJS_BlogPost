
const mongoose = require('mongoose');
// su dung Model BlogPost
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/test_my_database', {})

// insert 1 document vao trong collection
BlogPost.create({
    title: 'Test Blog Post',
    body: 'This is BlogPost with title'
})
    .then(blogpost => {
        console.log('Blog post created:' ,blogpost);
    })
    .catch(err => {
        console.error('Error creating blog post:', err)
    });

// get du lieu = find
BlogPost.find({
    title: 'Test Blog Post' //dieu kien filer (optional)
})
.then(blogpost => {
    console.log('Blog posts:', blogpost);
})
.catch(err => {
    console.error('Error getting blog posts:', err)
});

// update document = ham findByIdAndUpdate
var id = "66d579402d0cf463797413d2"
BlogPost.findByIdAndUpdate(id, {
    title: 'Updated Test Blog Post'
})
.then(blogpost =>{
    console.log('Blog post updated:', blogpost);
})
.catch(err => {
    console.error('Error updating blog post:', err)
})

// xoa document = findByIdAndDelete()
var id = "66d579402d0cf463797413d2"
BlogPost.findByIdAndDelete(id)
.then(blogpost => {
    console.log('Blog post deleted:', blogpost);
})
.catch(error => {
    console.error('Error deleting blog post:', error)
})