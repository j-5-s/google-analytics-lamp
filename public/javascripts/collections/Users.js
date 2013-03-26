define(['jQuery',
    'Underscore',
    'Backbone',
    'models/User'
], function( $, _, Backbone, ls ,UserModel) {

  var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    getActiveUser: function() {
      return this.find(function(user){
        return user.get('active') === true;
      });
    },
    resetActive: function() {
      this.each(function(usr){
        usr.set('active',false);
        usr.save();
      });
    },
    getByAccountId: function( accountId ){
      return this.find(function(usr){
        return usr.get('account_id') === accountId;
      });
    }
  });

  return UserCollection;
});
