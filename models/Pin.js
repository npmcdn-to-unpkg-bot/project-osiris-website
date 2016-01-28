var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  owner: String,
  pins: Number,
  title: String,
  url: String
});

module.exports = mongoose.model('Pin', pinSchema);
