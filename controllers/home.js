// Load models
var User = require('../models/User');
var Encounter = require('../models/Encounter');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  Encounter.find({}, function(err, encounter) {
    res.render('home', {
      title: 'Home'
    });
  });
};
