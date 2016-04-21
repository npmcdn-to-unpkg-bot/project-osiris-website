// Load models
var User = require('../models/User');
var Encounter = require('../models/Encounter');
var Encounters = require('../models/Encounters');
var request = require('request');

/**
 * GET /encounter
 * Encounter page.
 */
exports.getEncounter = function(req, res) {
  res.render('encounter', {
    title: 'Encounter'
  });
};

/**
 * POST /encounter
 * Post an encounter
 */
exports.postEncounter = function(req, res) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('url', 'Image URL is not valid').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/encounter');
  }

  var title = req.body.title;
  var url = req.body.url;

  if (!req.user) {
    req.flash('errors', { msg: "Must log in to post" });
    return res.redirect('/login');
  }
  request(url, function(error, response, body) {
    if (error) url = "http://dummyimage.com/800x600&text=Encounter";
    var encounter = new Encounter({
      owner: req.user.profile.name,
      encounters: 0,
      title: title,
      url: url
    })
    Encounters.findOneAndUpdate({}, {$push: {encounters: encounter}}, {upsert: true}, function(e, fin) {
      req.flash('success', { msg: 'Encounter posted successfully!' });
      res.redirect('/');
    });
  });
};
