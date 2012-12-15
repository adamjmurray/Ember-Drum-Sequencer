// The application namespace is DS, for Drum Sequencer
var DS = Ember.Application.create({

  // The number of steps in a track
  STEP_COUNT: 16,
  
  MIN_BPM: 30,

  MAX_BPM: 240

});


DS.ApplicationController = Ember.Controller.extend();

DS.ApplicationView = Ember.View.extend({templateName: 'application'});
