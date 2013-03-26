/*globals Raphael, _gaq */
define(['jQuery',
    'Underscore',
    'Backbone',
    'text!templates/home.html',
    'vendor/jquery/jquery.validate',
    'vendor/jquery/jquery.form'
], function( $, _, Backbone, HomeTemplate) {

  var Home = Backbone.View.extend({
    initialize: function() {

    },
    events: {
    },
    render: function() {
      var tempVars = {
          account_id: '',
          password:'',
          profile_id: ''
        },
        self = this;

      this.$el.html(_.template(HomeTemplate,tempVars));
      $("#profile",this.$el).validate({
          submitHandler: self.submit
        });
      return this;
    },
    submit: function(form){

      $(form).ajaxSubmit({
        success:function(resp){

          if (resp.error) {
            //handle the error
             alert('Error, account credentials are invalid');
          } else {
              alert('saved');
          }

        }
      });
    }

  });

  return Home;

});