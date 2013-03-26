describe('Router', function() {
  beforeEach(function() {
    var flag = false,
      that = this;

    require(['app'], function(AppRouter) {
      that.app = new AppRouter.initialize();
      flag = true;
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('should turn on when toggled', function(){
    $('#sandbox').append('<a id="onoff"></a>');

    this.app.toggle('on');
    var n = $('#onoff').text();
    expect(n).toEqual('n');

  });
});