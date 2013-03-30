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
      'submit #toggle': 'submitToggle'
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
    },
    submitToggle: function(e) {
      var curStatus = parseInt($('#status').val(),10),
          url = '/api/toggle/' + ((curStatus === 1) ? 'off' : 'on');
      $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON'
      }).done(function(res){
        if (curStatus === 1) {
          $("#status").val('0')
        } else {
          $("#status").val('1')
        }

      })
    }

  });

  return Home;

});