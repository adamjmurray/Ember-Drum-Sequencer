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
});

DS.initialize();
