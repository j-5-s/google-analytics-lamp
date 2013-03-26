/*globals $,Backbone, window, document, cwidth*/
//This file loads the main app with the bootstrap daata
//and router
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/HomeView',
  'globals'
], function( $, _, Backbone, HomeView, globals ){

  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      this.views = {
        home: HomeView
      };



    },
    routes: {
      // Define some URL routes
      ""       : "defaultPage",
    },
    defaultPage: function() {
      var view = new HomeView();
      var el = view.render().el;
      $('#pages').html(el);
    }
  });
  return {
    initialize: function(options) {
      var appRouter = new AppRouter(options);
      Backbone.history.start();
      return appRouter
    }
  };
});

