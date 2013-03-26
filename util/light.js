 var noduino = require('./noduino/noduino');

var getLight = function(cb) {
  noduino(function(NoduinoObj, NoduinoConnector, Logger){
  var Noduino = null,
      lite = false;




      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: true}, NoduinoConnector, Logger);
        Noduino.connect(function(err, board) {

            board.withLED({pin:9}, function(err,LED){
              cb(LED);
            });


        });
      }
  });
};

module.exports = getLight;
