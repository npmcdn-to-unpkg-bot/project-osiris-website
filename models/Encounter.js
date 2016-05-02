var mongoose = require('mongoose');

var encounterSchema = new mongoose.Schema({
  owner: String,
  description: String,
  title: String
});

module.exports = mongoose.model('Encounter', encounterSchema);
