const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// khai bao module ma hoa mat khau
const bcrypt = require('bcrypt')
// tao Schema = table
const UserSchema = new Schema({
    username: {
    type: String,
    required: true,
    unique: true // tranh lap lai
    },
    password: {
    type: String,
    required: true 
    }
    });

// 
UserSchema.pre('save', function (next) { //ham .pre() de biet can thuc hien ham  truoc khi luu vao conllectionw
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => { // ma hoa mat khau 10 lan => ma hash
    user.password = hash
    next()
    })
})

//export model 
const User = mongoose.model('User', UserSchema); //model ten user
module.exports = User;