var noduino = function(cb) {
  var requirejs = require('requirejs');
  requirejs.config({nodeRequire: require});

  requirejs([ './util/noduino/noduino-public/scripts/libs/Noduino', 
    './util/noduino/noduino-public/scripts/libs/Noduino.Serial', 
    './util/noduino/noduino-public/scripts/libs/Logger'], 
    cb
    );
}

module.exports = noduino;