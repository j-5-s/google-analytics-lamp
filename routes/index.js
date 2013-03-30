
var _            = require('underscore'),
    globals      = require('../globals'),
    helpers      = require('../util/helpers'),
    rgb          = require('../util/rgb'),
    getLight     = require('../util/light'),
    getGAData    = require('../util/ga-data'),
    events       = require('events'),
    eventEmitter = new events.EventEmitter();

// /**
//  * update the light from Google Analytics
//  **/

// function updateLight(light) {
//   getGAData(function(err, entries){
//     var hour = new Date().getHours();
//     //map the red/green to 0,255
//     //green being 255 when its at its max
//     //red being 255 at its min and vice versa
//     //for the max, use a handicap based on the current
//     //hour so that its not red all day until it hits the avg
//     var visits = entries.getTodaysVisits(),
//         max = entries.getMax() * (hour/24);
//     if (visits > max) {
//       max = visits;
//     }

//     var strength = helpers.convertToRange(visits,
//           [entries.getMin(),max],
//           [0,255]
//         );
//     strength = parseInt(strength, 10);

//     console.log('setting strength to ' + strength);
//     light.set(strength);

//   });
// }

/**
 * set the color of the light from ga
 **/
function updateLED(rgb) {
  console.log('updating')
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


    var liveRed = helpers.convertToRange(visits,
          [entries.getMin(),max],
          [255,0]
        ),
        liveGreen = helpers.convertToRange(visits,
          [entries.getMin(),max],
          [0,255]
        );

    if (typeof red === 'undefined') {
      red = liveRed
    }

    if (typeof green === 'undefined') {
      green = liveGreen;
    }

    console.log('setting r/g to ' + red + '/' + green);
    rgb.r.set(parseInt(red,10));
    rgb.g.set(parseInt(green,10));
  });
}

//begin with instantiating the light
rgb.getRGB(function(rgb){

 eventEmitter.emit('start',rgb);
});

//no current need for this to be an event
//but maybe necessarry in the future
eventEmitter.on('start', function(rgb){
  light = rgb;
  eventEmitter.emit('on');
});

//handle events for turning the light on
eventEmitter.on('on', function(){
    updateLED(light);
    interval = setInterval(function(){
      updateLED(light);
    },10000);
});

//handle events for turning the light off
eventEmitter.on('off', function() {
  clearInterval(interval);
  if (light) {
    light.setOff();
  }
});
/**
 * GET all entries
 * Returns a list of entries, min, max, today's color, count
 */
exports.entries = function(req, res) {

  getGAData(function(err,entries){
    res.json({
      entries: entries.toTable(),
      max: entries.getMax(),
      min: entries.getMin(),
      todayColor: entries.getTodaysColor(),
      todayCount: entries.getTodaysVisits()
    });
  });
};


/*
 * GET home page.
 */

exports.index = function(req, res){
  //some flag if we have valid credentials
  res.render('index', {
    title: 'Google Analytics Lamp'
  });

};

/**
 * POST turns light on/off
 */
exports.toggle = function(req,res) {
  var status = req.params.status;
  if (status === 'on') {
    globals.on = true;
    eventEmitter.emit('on');
    res.json({status:1});
  } else {
    globals.on = false;
    eventEmitter.emit('off');
    res.json({status:0});
  }

};
