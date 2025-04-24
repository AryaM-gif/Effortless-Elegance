const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    banned: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: false
    },
    like: {
        type: Array,
        required: false
    },
    order: {
        type: Array,
        require: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },
    lastLoginAt: {
        type: Date,
        default: null
    },
    lastLogoutAt: {
        type: Date,
        default: null
    }
});

const User = mongoose.model('User', userSchema, 'usrs');

module.exports = User;
