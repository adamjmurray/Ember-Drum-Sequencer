// The application namespace is DS, for Drum Sequencer
var DS = Ember.Application.create({

  // The number of steps in a track
  STEP_COUNT: 16,
  
  MIN_BPM: 30,

  MAX_BPM: 240

});


DS.ApplicationController = Ember.Controller.extend();

DS.ApplicationView = Ember.View.extend({templateName: 'application'});


DS.Router = Ember.Router.extend({
  
  root: Ember.Route.extend({

    index: Ember.Route.extend({
  
      route: '/',
  
      connectOutlets: function(router) {
        router.transitionTo('fourTrackPattern', {
          track_one:   '0000',
          track_two:   '0000',
          track_three: '0000',
          track_four:  '0000'
        });
      }
    }),

    fourTrackPattern: Ember.Route.extend({
      route: '/:track_one/:track_two/:track_three/:track_four',

      connectOutlets: function(router, params) {        
        var trackStates = [params.track_one, params.track_two, params.track_three, params.track_four];
        router.get('patternController').updateTrackStates(trackStates);        
        
        var applicationController = router.get('applicationController');
        applicationController.connectOutlet('patternView', 'pattern');
        applicationController.connectOutlet('transportView', 'transport');        
      }
    })
  })
})


$(document).ready(function() {
  // Setup keyboard shortcuts
  //document.onkeyup = function(e) {
  //  if(e.keyCode >= 65 && e.keyCode <= 90) DS.pattern.transport.toggle(); // play/stop on each press of an alphabetic key
  //};

  DS.initialize();
});
