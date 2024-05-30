const mongoose = require("mongoose");
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
const Community = require("./Community");

var post = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    username: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        type: String,
        ref: 'Likes'
    }],
    archived: {
        type: Boolean,
        default: false
    },
});

post.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('Post', post)