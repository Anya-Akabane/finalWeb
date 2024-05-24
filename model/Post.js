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
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [like],
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }
});

post.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('Post', post)