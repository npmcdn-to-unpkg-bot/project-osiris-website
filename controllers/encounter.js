// Load models
var User = require('../models/User');
var Encounter = require('../models/Encounter');
var Encounters = require('../models/Encounters');
var request = require('request');

/**
 * GET /encounters
 * Encounters page.
 */
exports.getEncounters = function(req, res) {
  Encounters.findOne({}, function(err, encounter) {
    var encounters = (encounter)? encounter.encounters : [
      {_id: "1", title:"Encounter1", owner:"Herman Fassett", description: "Lame description"},
      {_id: "2", title:"Untitled Encounter", owner:"Herman Fassett", description: "Hello"},
      {_id: "3", title:"This is a rather long title for an encounter to have", owner:"Herman Fassett", description: "This description is"}
    ];
    res.render('encounters', {
      title: 'Encounters',
      encounters: encounters
    });
  });
};

exports.loadEncounter = function(req, res) {
  Encounters.findOne({}, function(err, encounter) {
    var encs = encounter.encounters;
    if (encs.length) {
      for (var i = 0; i < encs.length; i++) {
        if (encs[i]._id == req.params.id) {
          res.render('encounter', {
            title: encs[i].title,
            owner: encs[i].owner,
            description: encs[i].description
          })
        }
        else if (i == encs.length && encs[i]._id != req.params.id) {
          req.flash('error', {msg: "Encounter not found."});
          res.redirect('/encounters');
        }
      }
    }
  });
};

/**
 * GET /encounter
 * Encounter page.
 */
exports.getEncounter = function(req, res) {
  res.render('new', {
    title: 'New Encounter'
  });
};

/**
 * POST /encounter
 * Post an encounter
 */
 
exports.postEncounter = function(req, res) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();

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
  
  var title = req.body.title.replace(/,/g, "");
  var description = req.body.description.replace(/,/g,"");
  
  var encounter = new Encounter({
    owner: req.user.profile.name,
    title: title,
    description: description
  });
  Encounters.findOneAndUpdate({}, {$push: {encounters: encounter}}, {upsert: true}, function(e, fin) {
    req.flash('success', {msg: "Encounter successfully created!"});
    res.redirect('/encounters');
  });
}

/**
 *  Download encounter as CSV
 */
 
exports.downloadEncounter = function(req, res) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();

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
  var description = req.body.description.replace(/,/g,"");

  var csv = [["title", "description"], [title, description]];
  var csvContent = "";//"data:text/csv;charset=utf-8,";
  csv.forEach(function(infoArray, index){
    dataString = infoArray.join(",");
    csvContent += index < csv.length ? dataString+ "\n" : dataString;
  });

  // Download CSV
  res.setHeader('Content-disposition', 'attachment; filename='+title.replace(/\s/g, "_")+'.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csvContent);
};
