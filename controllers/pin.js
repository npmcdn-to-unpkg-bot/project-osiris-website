// Load models
var User = require('../models/User');
var Pin = require('../models/Pin');
var Pins = require('../models/Pins');
var request = require('request');

/**
 * GET /pin
 * Pin page.
 */
exports.getPin = function(req, res) {
  res.render('pin', {
    title: 'Pin'
  });
};

/**
 * POST /pin
 * Post a pin
 */
exports.postPin = function(req, res) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('url', 'Image URL is not valid').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/pin');
  }

  var title = req.body.title;
  var url = req.body.url;

  if (!req.user) {
    req.flash('errors', { msg: "Must log in to post" });
    return res.redirect('/login');
  }
  request(url, function(error, response, body) {
    if (error) url = "http://dummyimage.com/800x600&text=Pinternet";
    var pin = new Pin({
      owner: req.user.profile.name,
      pins: 0,
      title: title,
      url: url
    })
    Pins.findOneAndUpdate({}, {$push: {pins: pin}}, {upsert: true}, function(e, fin) {
      req.flash('success', { msg: 'Pin posted successfully!' });
      res.redirect('/');
    });
  });
};
