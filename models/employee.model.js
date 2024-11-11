
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    designation : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
},{timestamps : true});

const Employee = mongoose.model('Employee', employeeSchema, 'employee_details');

module.exports = Employee;