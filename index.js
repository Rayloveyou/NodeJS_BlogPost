// cai dat npm install express de khoi tao serevere
// cai dat  npm install nodemon --save-dev de auto update server
// config trong package.json de start server voi "start": "nodemon index.js",
// npm install ejs --save
// cai dat mongodb: npm install mongoose
// cài đặt express-fleupload: npm install express-fileupload --save
// store post :  cai npm install body-parser truoc
// cai dat module bcrypt để mã hóa mật khẩu: npm i --save bcrypt
// cai dat express-session de luu cookies : npm install --save express-session
const express= require('express')
const app = new express()


// khai bao EJS voi Express
const ejs = require('ejs')
app.set('view engine','ejs')
// Đăng ký middleware expressSession
const expressSession = require('express-session'); 

//khai bao bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.raw());


// ket noi mongodb
const mongoose = require('mongoose');   
mongoose.connect('mongodb://localhost/my_database',{} )

// import các module,middleware
const authMiddleware = require('./middleware/authMiddleware')
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

//khai báo fileupload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

//Session. khai báo trước các route
app.use(expressSession({
    secret: 'keyboard cat', // Có thể để chuỗi bất kỳ cho secret
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: false // Không lưu session trống
}));

// Khai bao folder public
app.use(express.static('public'))

app.listen(4000, ()=> {
    console.log('Server is running on port 4000')

})

// Ẩn các menu "Login" và "New User" khi user đã login
global.loggedIn = null; // khai báo global để có thể truy cập ở các file EJS
app.use("*", (req,res,next) => { // "*" = all request
    loggedIn = req.session.userId; // gán userId cho biến loggedIn
    next();
});

// Log out
app.get('/auth/logout', logoutController)

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})

app.get('/contact', (req, res) => {
//res.sendFile(path.resolve(__dirname,'pages/contact.html'))
res.render('contact');
})


// GET REQUEST: Hien thi cac bai viet ở ngoài trang chủ
app.get('/', homeController)

//Middleware kiểm tra có phải user hợp lệ không để tạo post mới (phải đặt trước khi tạo post mới newPostController )
// route cho trang tao post moi, gọi đến controller
app.get('/posts/new',authMiddleware,newPostController)

// POST REQUEST : tạo bài viết (kèm xác thực user với middleware)
app.post('/posts/store',authMiddleware, storePostController)


//Hiển thị nội dung một Post: nhận biết qua id của post
app.get('/post/:id', getPostController)

// Tạo và đăng ký Validation middleware 
// kiểm tra nếu có phần nào null sẽ redirect về lại màn hình tạo post mới
const validateMiddleware = require("./middleware/validationMiddleware");
app.use('/posts/store',validateMiddleware); //apply hàm middleware , mỗi khi request đến url thì sẽ thực thi hàm

//Register
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController) // route

//Store User
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

//Login
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController);

//Store Login
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

// Not found: Request không thuộc route nào thì sẽ nhảy vào route cuối cùng (notfound)
app.use((req, res) => res.render('notfound')); 