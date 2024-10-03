const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// tao Schema = table
const ContactSchema = new Schema({
    name: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true 
    },
    phonenumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
    });

//export model 
const Contact = mongoose.model('Contact', ContactSchema); //model ten user
module.exports = Contact;