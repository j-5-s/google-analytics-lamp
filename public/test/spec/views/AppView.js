describe('Views :: AppView', function() {
  beforeEach(function() {
    var flag = false,
      that = this;

    require(['views/AppView'], function(AppView) {
      that.appView = new AppView();
      flag = true;
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('fetch entries api should return entries object', function(){
    var flag = false;

    this.appView.fetchEntries(function(entries) {
      expect(entries.min).toBeDefined();
      expect(entries.max).toBeDefined();
      expect(entries.todayColor).toBeDefined();
      expect(entries.todayCount).toBeDefined();
      expect(entries.entries.length).toBeGreaterThan(27);
      flag = true;
    });

    waitsFor(function(){
      return flag;
    });

  });
});