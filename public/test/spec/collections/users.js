describe('Collections :: Users', function() {
  beforeEach(function() {
    var flag = false,
      that = this;

    require(['collections/Users','models/User'], function(UserCollection,UserModel) {
      that.UserCollection = UserCollection;
      that.UserModel = UserModel
      flag = true;
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('should add to the user collection', function(){
    var c = new this.UserCollection();
    var u = new this.UserModel({username:'james',password:'123'});
    c.add(u);
    expect(c.length).toEqual(1);
  });
});