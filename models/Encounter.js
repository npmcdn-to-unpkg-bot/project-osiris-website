var mongoose = require('mongoose');

var encounterSchema = new mongoose.Schema({
  owner: String,
  level: Number,
  plane: String,
  climate: String,
  terrain: String,
  title: String,
  url: String
});

module.exports = mongoose.model('Encounter', encounterSchema);
