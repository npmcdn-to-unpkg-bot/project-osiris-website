var mongoose = require('mongoose');

var pinsSchema = new mongoose.Schema({
  pins: Array
});

module.exports = mongoose.model('Pins', pinsSchema);
