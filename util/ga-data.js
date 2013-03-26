var ga = require('googleanalytics'),
    helpers = require('../util/helpers'),
    _  = require('underscore'),
    fs = require('fs');

/**
 * Helper function to pad 0-9
 * with 0, for dates
 * @param {Mixed} n formats to string
 * @returns {String} n
 */
var padZero = function( n ){
  n = '' + n;
  if (n.length === 1) {
    n = '0' + n;
  }
  return n;
};

var formatDate = function( str ) {
  //changes 20120917 to 09/17/2012
  str = '' + str;
  var year = str.substr(0,4),
      month = str.substr(4,2),
      date  = str.substr(6,2);

      return  month + '/' + date + '/' + year;
}

var GAEntries = function(entries) {
  this.entries = entries;
  this.visits = []
};

GAEntries.prototype.getVisits = function() {

  //cache the visits
  if (this.visits.length > 0) {
    return this.visits;
  }

  var entries = this.entries;
  var totals = _.map(entries,function(entry){
    return entry.metrics[0]['ga:visitors'];
  });

  return this.visits = totals;
};

GAEntries.prototype.getAverageVisits = function(){
  var totals = this.getVisits(),
      count = totals.length,
      sum = _.reduce(totals, function(memo, num){
        return memo + num;
      }, 0);

  return sum / count;
};

GAEntries.prototype.getTodaysVisits = function() {
  var entries = this.entries;
  var today = _.last(entries);
  return today.metrics[0]['ga:visitors'];
};

GAEntries.prototype.getMin = function() {
  return _.min(this.getVisits());
};

GAEntries.prototype.getMax = function() {
  return _.max(this.getVisits());
};

GAEntries.prototype.getTodaysColor = function() {

    var hour = new Date().getHours();
    //map the red/green to 0,255
    //green being 255 when its at its max
    //red being 255 at its min and vice versa
    //for the max, use a handicap based on the current
    //hour so that its not red all day until it hits the avg
    var visits = this.getTodaysVisits(),
        max = this.getMax() * (hour/24);
    if (visits > max) {
      max = visits;
    }
    var min = this.getMin();
  return {
    red: parseInt(helpers.convertToRange(visits,[min,max],[255,0]),10),
    green: parseInt(helpers.convertToRange(visits,[min,max],[0,255]),10)
  };
};

GAEntries.prototype.toTable = function() {
  //{date:09/30/2012,visits:10,color:50}
  var entries = this.entries;
  var max = this.getMax();
  var min = this.getMin();
  var table = [];
  for (var i = 0; i < entries.length;i++) {
    var entry = entries[i];
    table.push({
      date: formatDate(entry.dimensions[0]['ga:date']),
      visits: entry.metrics[0]['ga:visitors'],
      color: {
        red:parseInt(helpers.convertToRange(entry.metrics[0]['ga:visitors'],[min,max],[255,0]),10),
        green:parseInt(helpers.convertToRange(entry.metrics[0]['ga:visitors'],[min,max],[0,255]),10)
      },
    });
  }
  return table;
};

/**
 * Gets GA Data (currently just vistis) by date
 * for the past month
 * @param {Object} options
 * @returns {Object} list
 *
 */
var getGAData = function(options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }
  //simple object parameters for GA module
  //dont want to include my credentials on git
  //{user:'xxx','password':'xxx'}
  var str = fs.readFileSync('./private/account.json', 'utf8'),
      config = JSON.parse(str),
      gaConfig = {user:config.account_id, password: config.password},
      GA = new ga.GA(gaConfig);

  GA.login(function(err, token) {
    if (err) {
      return cb();
    }
    //hard code for now, need to make configurable
    var curDate = new Date();
    var startDate = new Date();
        startDate.setDate(curDate.getDate() - 30);

    var start_date = options.start_date || [
          startDate.getFullYear(),
          padZero(startDate.getMonth()+1),
          padZero(startDate.getDate())
        ].join('-'),
        end_date = options.end_date ||  [
          curDate.getFullYear(),
          padZero(curDate.getMonth()+1),
          padZero(curDate.getDate())
        ].join('-');

    var params = {
      'ids': 'ga:'+config.profile,
      'start-date': start_date,
      'end-date': end_date,
      'dimensions': 'ga:date',
      'metrics': 'ga:visitors'
    };


    GA.get(params, function(err, entries) {
      if (err){
        cb(err,null)
      }
      cb(null, new GAEntries(entries));
    });
  });
};

module.exports = getGAData;