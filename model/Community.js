const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const community = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Community', community);