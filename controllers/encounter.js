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
  req.assert('data', 'Data cannot be empty').notEmpty();
  req.assert('number', 'Number cannot be blank').notEmpty();
  req.assert('type', 'Type cannot be unspecified').notEmpty();

  var errors = req.validationErrors();

  // Check for errors
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/encounter');
  }

  // Check for log in
  if (!req.user) {
    req.flash('errors', { msg: "Must log in to create encounter" });
    return res.redirect('/login');
  }

  //Generate CSV
  var title = req.body.title.replace(/,/g, "");
  var data = req.body.data.replace(/,/g,"");
  var number = req.body.number;
  var type = req.body.type;

  var csv = [["title", "number", "type", "data"], [title, number, type, data]];
  var csvContent = "";//"data:text/csv;charset=utf-8,";
  csv.forEach(function(infoArray, index){
    dataString = infoArray.join(",");
    csvContent += index < csv.length ? dataString+ "\n" : dataString;
  });

  // Download CSV
  res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csvContent);
  //var encodedUri = encodeURI(csvContent);
  //res.csv(csv);
};
