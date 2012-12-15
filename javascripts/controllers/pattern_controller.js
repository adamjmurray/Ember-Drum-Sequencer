/**
 * A drum pattern, which consists of a collection of tracks.
 */
DS.PatternController = Ember.Controller.extend({

  tracks: null,

  transportController: null,

  isPlayingBinding: 'transportController.isPlaying',

  currentStepIndexBinding: 'transportController.currentStepIndex',


  init: function() {
    var tracks = ['kick', 'snare', 'hat', 'clap'].map(function(name){ return DS.Track.create({name: name}); });
    this.set('tracks', tracks);    
  },

  
  playStep: function(stepIndex, volume) {
    if(stepIndex < 0 || stepIndex >= DS.STEP_COUNT) return;
    this.get('tracks').forEach(function(track) {
      track.get('steps')[stepIndex].play(volume);
    });
  },


  /**
   * Serialize the tracks' state into a list of hexadecimal strings
   */
  serialize: function() {
    var tracks = this.get('tracks');
    return tracks.map(function(track){ return track.serialize(); });
  },

  /**
   * Set the tracks' state from a list of hexadecimal strings
   */
  deserialize: function(hexadecimals) {
    var self = this;
    var tracks = this.get('tracks');
    tracks.forEach(function(track, index) {
      var hexadecimal = hexadecimals[index];
      if(hexadecimal) track.deserialize(hexadecimal);      
    });    
  }
});
