/*globals app, Backbone, $, resize, _gaq, window */
// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone'
], function( $, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    initialize: function() {

    },
    routes: {
      // Define some URL routes
      "main": "defaultPage"
    }
  });



  return {
    initialize: function(options){
      var appRouter = new AppRouter(options);
      Backbone.history.start();
      return appRouter;
    }
  }
});

