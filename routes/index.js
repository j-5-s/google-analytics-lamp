
var _ = require('underscore'),
    globals = require('../globals'),
    helpers = require('../util/helpers'),
    getLight = require('../util/light'),
    getGAData = require('../util/ga-data');


/**
 * update the light from Google Analytics
 **/

function updateLight(light) {
  getGAData(function(err, entries){
    var hour = new Date().getHours();
    //map the red/green to 0,255
    //green being 255 when its at its max
    //red being 255 at its min and vice versa
    //for the max, use a handicap based on the current
    //hour so that its not red all day until it hits the avg
    var visits = entries.getTodaysVisits(),
        max = entries.getMax() * (hour/24);
    if (visits > max) {
      max = visits;
    }

    var strength = helpers.convertToRange(visits,
          [entries.getMin(),max],
          [0,255]
        );
    strength = parseInt(strength, 10);

    console.log('setting strength to ' + strength);
    light.set(strength);

  });
}


/*
 * GET home page.
 */

exports.index = function(req, res){
  //some flag if we have valid credentials
  if (true) {
    getLight(function(light){
      setInterval(function(){
        updateLight(light);
      },5000);
    });
  }

  res.render('index', {
    title: 'Google Analytics Lamp'
  });

};