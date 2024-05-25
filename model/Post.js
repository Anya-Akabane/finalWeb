const mongoose = require("mongoose");
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

var post = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    username: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    image: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{type: String}],
});

post.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('Post', post)