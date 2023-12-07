const mongoose = require('mongoose');

const student = new mongoose.Schema({
    regnum: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    accept: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    courses:{
    type: [String],
    }
});

module.exports = mongoose.model('student', student);