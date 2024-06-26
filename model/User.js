const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean, 
        default: false
    },
    nickname: {
        type: String
    },
    bio: {
        type: String
    },
    gender: {
        type: Number
    },
    birthdate: { 
        type: Date
    },
    image: {
        type: String
    },
    archived: {
        type: Boolean,
        default: false
    },
})
 
User.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User', User)