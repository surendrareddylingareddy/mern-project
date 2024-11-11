
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const Admin = mongoose.model('Admin', adminSchema, 'login_details');

module.exports = Admin;