// Load models
var User = require('../models/User');
var Pin = require('../models/Pin');
var Pins = require('../models/Pins');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  Pins.findOne({}, function(err, pin) {
    var pins = (pin)? pin.pins : [
      {src:"http://hermanfassett.me/images/Rogue.png", title:"Roguelike", owner:"herman_fassett"},
      {src:"http://hermanfassett.me/images/Life.PNG", title:"Conway's Game of Life", owner:"herman_fassett"},
      {src:"http://hermanfassett.me/images/Me.png", title:"It's me", owner:"herman_fassett"},
      {src:"http://hermanfassett.me/images/Me.jpg", title:"Me again", owner:"herman_fassett"},
      {src:"http://hermanfassett.me/images/Simon.png", title:"Simon Game", owner:"herman_fassett"}
    ];
    res.render('home', {
      title: 'Home',
      pins: pins
    });
  });

};
