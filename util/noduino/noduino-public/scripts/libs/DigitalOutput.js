define(function() {
  
  function DigitalOutput(options, Connector) { 
    if (false === (this instanceof DigitalOutput)) {
      return new DigitalOutput(options); }

    this.c      = Connector;
    this.pin    = options.pin;
    this.mode   = this.c.LOW;
    this.events = {};
  };

  DigitalOutput.prototype.setOn = function(callback) {
    if (!this.active) {
      this.active = true;
      this.set(this.c.HIGH, callback);
      this.emit('on');
      this.emit('change');
    }
    
    if (callback) {
      callback(); }
  };

  DigitalOutput.prototype.setOff = function(callback) {

    if (this.active) {

      this.active = false;
      this.set(this.c.LOW, callback);
      this.emit('off');
      this.emit('change');
    }
    
    if (callback) {
      callback(); }
  };

  DigitalOutput.prototype.set = function(mode, callback) {
    if (typeof mode === 'number') {
      this.c.current().analogWrite(this.pin, this.mode = mode, callback);
    } else {
      this.c.current().digitalWrite(this.pin, this.mode = mode, callback);
    }
    
  };
  
  DigitalOutput.prototype.setAnalog = function(mode, callback) {
    console.log('setting mode', mode)
    
  };

  DigitalOutput.prototype.clear = function(event) {
    this.events[event] = [];
  };

  DigitalOutput.prototype.on = function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; }
    this.events[event].push(callback);
  };

  DigitalOutput.prototype.emit = function(event, callback) {
    if (!this.events[event]) {
      return; }
    for (var i = 0; i < this.events[event].length; i++) {
      this.events[event][i](this); }
  };
  
  return DigitalOutput;
});
