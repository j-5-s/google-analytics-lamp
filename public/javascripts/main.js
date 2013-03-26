/*globals document */
(function(){

  'use strict';

  require.config({
    paths: {
      jQuery: './vendor/jquery/jquery',
      Underscore: './vendor/underscore/underscore',
      Backbone: './vendor/backbone/backbone',
      validator: './vendor/jquery/jquery.validate',
      ajaxform: './vendor/jquery/jquery.form',
      templates: './templates'
    },
    shim: {
      'Backbone': {
        //These script dependencies should be loaded before loading
        //backbone.js
        deps: ['Underscore', 'jQuery']
        //Once loaded, use the global 'Backbone' as the
      },
      'validator': {
        deps: ['jQuery']
      },
      'ajaxform': {
        deps: ['jQuery']
      }
    }
  });

  require([
    'app',
    'jQuery'
  ], function( app, $ ){
    $(function(){
      app.initialize();
    });

  });

}.call(this));