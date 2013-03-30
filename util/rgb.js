 var noduino = require('./noduino/noduino');

var getRGB = function(cb) {
  noduino(function(NoduinoObj, NoduinoConnector, Logger){
  var Noduino = null,
      rgb = {
        r: null,
        g: null,
        b: null,
        setOff: function() {
          if (this.r !== null && this.g !==null && this.b !== null) {
            console.log('turn light off')
            this.r.set(0);
            this.g.set(0);
           // this.b.set(0);
          }
        }
      };

      var checkSet = function(){
        for (var el in rgb) {
          if (!rgb[el]) {
            return false;
          }
        }
        cb(rgb);
      };


      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: true}, NoduinoConnector, Logger);
        Noduino.connect(function(err, board) {

            board.withLED({pin:9}, function(err,LED){
              rgb.r = LED;
              checkSet();
            });

            board.withLED({pin:10}, function(err,LED){
              rgb.g = LED;
              checkSet();
            });

            board.withLED({pin:11}, function(err,LED){
              rgb.b = LED;
              checkSet();
            });

        });
      }
  });
};

module.exports.getRGB = getRGB;