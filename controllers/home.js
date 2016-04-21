// Load models
var User = require('../models/User');
var Encounter = require('../models/Encounter');
var Encounters = require('../models/Encounters');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  Encounters.findOne({}, function(err, encounter) {
    res.render('home', {
      title: 'Home'
    });
  });
};
