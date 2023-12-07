const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('admin', AdminSchema);