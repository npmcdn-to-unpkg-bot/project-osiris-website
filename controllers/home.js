// Load models
var User = require('../models/User');
var Encounter = require('../models/Encounter');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  Encounter.find({}, function(err, encounter) {
    res.render('index', {
      title: 'Home'
    });
  });
};

exports.download = function(req, res) {
  var file = './upload/DRAGONS_beta_build_1.zip';
  res.download(file);
}