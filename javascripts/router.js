DS.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    
    application: Ember.Route.extend({
      route: '/',
  
      connectOutlets: function(router) {
        var applicationController = router.get('applicationController');
        applicationController.connectOutlet('patternView', 'pattern');
        applicationController.connectOutlet('transportView', 'transport');                    
      },


      'default': Ember.Route.extend({
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
          if(params.skipDeserilize) return;
          var trackStates = [params.track_one, params.track_two, params.track_three, params.track_four];
          router.get('patternController').deserialize(trackStates);          
        }      
             
      }),
  
      toggleStep: function(router, event) {
        var step = event.context;
        step.toggle();

        var trackStates = router.get('patternController').serialize();
        router.transitionTo('fourTrackPattern', {
          track_one:   trackStates[0],
          track_two:   trackStates[1],
          track_three: trackStates[2],
          track_four:  trackStates[3],
          skipDeserialize: true
        });      
      }
    })
  })
});

DS.initialize();
