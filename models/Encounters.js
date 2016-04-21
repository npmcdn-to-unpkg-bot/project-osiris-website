var mongoose = require('mongoose');

var encountersSchema = new mongoose.Schema({
  encounters: Array
});

module.exports = mongoose.model('Encounters', encountersSchema);
